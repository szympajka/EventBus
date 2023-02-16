import { useState } from "react";

const Modal = () => {
  const [show, setShow] = useState();

  on('esc', () => {
    setShow(false);
  });

  //...
}