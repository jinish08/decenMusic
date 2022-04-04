import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './AudioPlayer.module.css';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { UserContext } from '../providers/userContext';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../utils/firebase-config';

const AudioPlayer = ({ songSrc, preview, tokenID }) => {
	const { currentAccount } = useContext(UserContext);
	// state
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [views, setViews] = useState(0);

	// references
	const audioPlayer = useRef(); // reference our audio component
	const progressBar = useRef(); // reference our progress bar
	const animationRef = useRef(); // reference the animation

	useEffect(() => {
		const seconds = Math.floor(audioPlayer.current.duration);
		setDuration(preview ? 20 : seconds);
		progressBar.current.max = preview ? 20 : seconds;
	}, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

	const calculateTime = (secs) => {
		const minutes = Math.floor(secs / 60);
		const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		const seconds = Math.floor(secs % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${returnedMinutes}:${returnedSeconds}`;
	};

	const prevValue = isPlaying;

	useEffect(() => {
		const updateView = async () => {
			try {
				const userRef = collection(db, 'song');
				const q = query(userRef, where('hash', '==', tokenID));
				const querySnapshot = await getDocs(q);
				const userID = querySnapshot.docs[0].id;
				console.log(userID);
				const userDoc = doc(db, 'song', userID);
				const docSnap = await getDoc(userDoc);
				const v = docSnap.data().views;
				await updateDoc(userDoc, {
					views: parseInt(v) + 1,
				});
				setViews(views);
			} catch (error) {
				console.log(error);
			}
		};
		if (isPlaying) {
			updateView();
		}
	}, [isPlaying]);

	const togglePlayPause = () => {
		console.log('Hello');
		setIsPlaying(!prevValue);

		if (!prevValue) {
			audioPlayer.current.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			audioPlayer.current.pause();
			cancelAnimationFrame(animationRef.current);
		}
	};

	const whilePlaying = () => {
		progressBar.current.value = audioPlayer.current.currentTime;
		changePlayerCurrentTime();
		animationRef.current = requestAnimationFrame(whilePlaying);
	};

	const changeRange = () => {
		audioPlayer.current.currentTime = progressBar.current.value;
		changePlayerCurrentTime();
	};

	const changePlayerCurrentTime = () => {
		progressBar.current.style.setProperty(
			'--seek-before-width',
			`${(progressBar.current.value / duration) * 100}%`
		);
		setCurrentTime(progressBar.current.value);
	};

	const backThirty = () => {
		progressBar.current.value = Number(progressBar.current.value - 30);
		changeRange();
	};

	const forwardThirty = () => {
		progressBar.current.value = Number(progressBar.current.value + 30);
		changeRange();
	};

	return (
		<div className={styles.audioPlayer} style={{ marginLeft: '-10px' }}>
			<audio ref={audioPlayer} src={songSrc} preload="metadata"></audio>

			<button
				onClick={togglePlayPause}
				className={styles.playPause}
				style={{ zIndex: 1000 }}
			>
				{isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
			</button>

			{/* current time */}
			<div className={styles.currentTime}>{calculateTime(currentTime)}</div>

			{/* progress bar */}
			<div>
				<input
					type="range"
					className={styles.progressBar}
					defaultValue="0"
					ref={progressBar}
					onChange={changeRange}
				/>
			</div>

			{/* duration */}
			<div className={styles.duration}>
				{duration && !isNaN(duration) && calculateTime(duration)}
			</div>
		</div>
	);
};

export { AudioPlayer };
