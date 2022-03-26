import React from "react";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import classes from "./Info1.module.css";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
function Info1() {
  const [albumName, setAlbumName] = useState("The Purpose Light");
  const [songName, setSongName] = useState("No Going back");
  const [ownerAddr, setOwnerAddr] = useState("0X128912");
  const [views, setViews] = useState(123);
  const [orderAmt, setOrderAmt] = useState(0);
  const [price, setPrice] = useState(10);

  const usdPrice = price * 3111.6;
  return (
    <div className={classes.mainContainer}>
      <div className={classes.imgData}>
        <div className={classes.imgHeader}>
          <FaEthereum style={{ display: "inline", fontSize: "17px" }} />
          <IoMdAdd
            style={{
              display: "inline",
              fontSize: "15px",
              marginRight: "5px",
              color: "green",
            }}
            onClick={() => {
              setOrderAmt((prev) => {
                return prev + 1;
              });
            }}
          />
          <RiSubtractLine
            style={{
              display: "inline",
              fontSize: "15px",
              marginRight: "5px",
              color: "red",
            }}
            onClick={() => {
              if (orderAmt > 0) {
                setOrderAmt((prev) => {
                  return prev - 1;
                });
              }
            }}
          />
          <p className={classes.likes}>{orderAmt}</p>
        </div>
        <img src="/assets/testImage.jpeg" alt="" />
      </div>
      <div className={classes.nftData}>
        <div className={classes.songHeader}>
          <div className={classes.albumName}>
            <p>{albumName}</p>
          </div>
          <div className={classes.songName}>
            <p>{songName}</p>
          </div>
          <div className={classes.ownerDets}>
            <p className={classes.ownedBy}>
              Owned By <span className={classes.ownerAddr}>{ownerAddr} </span>{" "}
              <MdVerified
                style={{
                  display: "inline",
                  fontSize: "16px",
                  color: "#1b9ce8",
                  marginTop: "6px",
                }}
              />
            </p>
            <p className={classes.likes}>
              <AiFillHeart style={{ fontSize: "15px", display: "inline" }} />{" "}
              {views} Views {/* <FavoriteIcon /> {views} Streams{" "} */}
            </p>
          </div>
        </div>
        <div className={classes.priceContainer}>
          <p style={{ color: "#707a83" }}>Current Price</p>
          <p>
            <span className={classes.price}>
              <i class="fab fa-ethereum"></i>{" "}
              <span
                style={{
                  fontSize: "35px",
                  fontWeight: "700",
                  display: "inline",
                }}
              >
                {" "}
                <FaEthereum style={{ display: "inline", fontSize: "26px" }} />
                {price}
              </span>{" "}
            </span>{" "}
            <span className={classes.priceUsd}>(${usdPrice})</span>
          </p>
          <div className={classes.priceBtns}>
            <Button
              leftIcon={<FaWallet />}
              colorScheme="twitter"
              variant="solid"
              width="190px"
              mt="15px"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info1;
