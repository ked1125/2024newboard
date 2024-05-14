import React from "react";
import styled from "styled-components";

function CardItem({ product }) {
  // const ImageWrap = styled.div`` // 대문자여야함.. components처럼 사용
  // 나중에 요소 뜯어보면 태그이름이 div로 나옴.
  const ImageWrap = styled.div`
    width: 100%;
    height: 140px;
    overflow: hidden;
    &:hover img {
      // &를 쓰면 -> div:hover img랑 동일한거임
      transform: scale(1.2);
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: 0.3s;
    }
  `;
  return (
    <div className="border py-4 px-2">
      {/* {product.images[0]} */}
      {product.images.length > 0 && (
        <ImageWrap>
          <img
            src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${product.images[0]}`}
            alt=""
          />
        </ImageWrap>
      )}
      {/* 참이면 실행 */}
      <div>{product.title}</div>
    </div>
  );
  // function CardItem(props) {
  //   return <div>{props.product.title}</div>;
}

export default CardItem;
