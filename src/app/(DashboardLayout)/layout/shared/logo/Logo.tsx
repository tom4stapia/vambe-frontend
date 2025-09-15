import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="https://cdn.prod.website-files.com/680c0d216c6540b659f79bad/6838e5b9c8f92c3fcd6637b6_Vambe%20Logo%20B.svg" alt="logo" height={70} width={180} priority />
    </LinkStyled>
  );
};

export default Logo;
  