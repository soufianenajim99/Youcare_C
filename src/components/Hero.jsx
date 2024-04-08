const Hero = ({ value }) => {
  // const theme = useContext(ThemeContext);

  // const theme = useContext(ThemeContext);
  return (
    <div>
      <div className=" h-screen flex items-center justify-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            The Hero Page : Place Holderds {value}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The king, seeing how much happier his subjects were, realized the
            error of his ways and repealed the joke tax.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;
