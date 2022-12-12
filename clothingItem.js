import React, { useEffect } from "react";

export default function ClothingItem(props) {
  console.log("Clothing Item: ", props);
  function handleClick() {
    props.setTotal(props.total + props.item.price);
    props.setCart((prevCart) => {
      let newCart = [...prevCart];
      newCart[props.index] += 1;
      return newCart;
    });
    props.setQuantity(() => props.quantity + 1);
  }

  return (
    <div>
      <h1>{props.item.name}</h1>
      <Icon props={props.item.image} />

      {/* <img
        className="images"
        src={props.item.image}
        alt="img
      "
      /> */}
      <p>Product Description: {props.item.description}</p>
      <p>Price: ${props.item.price}</p>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

function Icon(props) {
  const [image, setSrc] = React.useState("preloadimg");

  useEffect(() => {
    console.log("Props: ", props);
    const load = async () => {
      const src = await loadImg(props);
      setSrc(src);
    };
    load().then();
  }, [props]);

  return image ? <img src={image} /> : "Loading...";
}

const loadImg = (src) =>
  new Promise((resolve, reject) => {
    console.log("Image Source: ", src);
    const img = new Image();
    img.src = src.props;
    img.onload = () => resolve(src.props);
    img.onerror = (err) => {
      console.log(err);
      reject(new Error("could not load image"));
    };
  });

// function loadImages() {
//   const [src, setSrc] = React.useState("preloadimg");
//   useEffect(() => {
//     const load = async () => {
//       await loadImg(
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Chess_Large.JPG/800px-Chess_Large.JPG"
//       ).then((src) => {
//         setSrc(src);
//       });
//     }; // Execute the created function directly
//     load();
//   }, [src, setSrc]);

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <img src={src} alt="example" />
//     </div>
//   );
// }
