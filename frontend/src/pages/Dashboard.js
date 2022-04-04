import React, { useContext, useEffect } from 'react';
import { Box, Circle, Flex, HStack, Image, Text } from '@chakra-ui/react';
import SidebarWithHeader from '../components/SidebarWithHeader.tsx';
import {
	PieChart,
	Pie,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Cell,
} from 'recharts';
import { UserContext, UserProvider } from '../providers/userContext';
import Card from '../components/Card';

const barColors = ['#6d85f9', '#993fe1'];
let renderLabel = function (entry) {
	return entry.name;
};

const color1 = ['#6d85f9', '#993fe1', '#d22cf7'];
const color2 = ['#C58BF2', '#EEA4CE'];

const Dashboard = () => {
	const { getCreatedNFTs, createdNFTs } = useContext(UserContext);

	let data1 = [
		{ name: 'Lean On', value: 6 },
		{ name: 'Never Give Up', value: 5 },
		{ name: 'Udd Gaye', value: 2 },
	];

	const data2 = [
		{
			name: 'Lean On',
			View: 6,
			Like: 4,
		},
		{
			name: 'Never Give Up',
			View: 5,
			Like: 4,
		},
		{
			name: 'Udd Gaye',
			View: 2,
			Like: 1,
		},
	];

	useEffect(() => {
		getCreatedNFTs();
	}, []);

	return (
		<>
			<Image
				zIndex="-1"
				position="absolute"
				src="/assets/explorebg.svg"
				height="100vh"
				width="100vw"
				objectFit="cover"
				alt="Dan Abramov"
				left="0"
				top="0"
			/>
			<Box position="absolute" width="full" zIndex="0">
				<SidebarWithHeader />
			</Box>
			<Box postion="absolute" ml="18%" pt="20" zIndex="0">
				<HStack>
					<Box zIndex="10">
						<PieChart width={400} height={400} zIndex="0">
							<Pie
								dataKey="value"
								isAnimationActive={false}
								data={data1}
								cx="50%"
								cy="50%"
								outerRadius={80}
								label={renderLabel}
								zIndex="0"
							>
								{data1.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={color1[index % 3]}
										color="white"
									/>
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</Box>
					<Box>
						<BarChart
							width={700}
							height={300}
							data={data2}
							barCategoryGap={15}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
							padding={{
								right: 30,
								left: 20,
							}}
						>
							<defs>
								<linearGradient
									id="colorUv"
									x1="100%"
									y1="100%"
									x2="0%"
									y2="100%"
									spreadMethod="reflect"
								>
									<stop offset="0" stopColor="#C58BF2" />
									<stop offset="1" stopColor="#EEA4CE" />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="2 2" />
							<XAxis dataKey="name" />
							<YAxis dataKey="View" />
							<Tooltip />
							<Legend />
							<Bar
								dataKey="View"
								/*fill="url(#colorUv)"*/ radius={[20, 20, 20, 20]}
							>
								{data2.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={barColors[0]} />
								))}
							</Bar>
							<Bar
								dataKey="Like"
								/*fill="url(#colorUv)"*/ radius={[20, 20, 20, 20]}
							>
								{data2.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={barColors[1]} />
								))}
							</Bar>
						</BarChart>
					</Box>
				</HStack>
				<Flex flexWrap={'wrap'} width={'100%'} justifyContent={'space-evenly'}>
					{createdNFTs?.length === 0 ? (
						<Text fontSize={'4xl'}>No items</Text>
					) : (
						createdNFTs?.map((i) => (
							<Card
								songSrc={i.song}
								preview={true}
								imageSrc={i.image}
								seller={i.seller}
								price={i.price}
								tokenID={i.tokenId}
								name={i.name}
								dashboard={true}
							/>
						))
					)}
				</Flex>
			</Box>
		</>
	);
};

export default Dashboard;
