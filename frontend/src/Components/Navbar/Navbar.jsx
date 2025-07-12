"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Hamburger from "./Hamburger";
import Link from "next/link";

const Navbar = () => {
	useEffect(() => {
		(async () => {
			const isLoggedIn = await fetch(`${serverUrl}/auth/check`);
			console.log(isLoggedIn);
		})();
	}, []);

	return (
		<nav className="navbar h-24 w-screen bg-white border-b-2 flex justify-between items-center px-20 max-sm:px-6">
			<Image
				src="./Logo.svg"
				alt="Logo"
				height={100}
				width={100}
				priority
				draggable={false}
				className="w-40 max-sm:w-35"
			/>
			<div className="register-buttons flex items-center gap-5 max-sm:hidden">
				<button className="signup font-poppins border bg-white px-5 py-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
					<Link href="/auth/signup">Signup</Link>
				</button>
				<button className="login font-poppins border bg-white px-5 py-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
					<Link href="/auth/login">Login</Link>
				</button>
			</div>
			<Hamburger />
		</nav>
	);
};

export default Navbar;
