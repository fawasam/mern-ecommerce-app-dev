import React from "react";
import Cart from "./Cart";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useStateContext } from "../lib/context";
import { NavStyles, NavItems } from "../styles/NavStyle";
const { AnimatePresence, motion } = require("framer-motion");
import { useUser } from "@auth0/nextjs-auth0";
import User from "./User";
const Nav = () => {
  const { showCart, setShowCart, total } = useStateContext();
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    <NavStyles>
      <Link href={"/"}>Home</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {total > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {total}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
};

export default Nav;
