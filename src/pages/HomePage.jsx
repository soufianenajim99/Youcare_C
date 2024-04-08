import Hero from "@/components/Hero";

import ListAnnonce from "@/components/ListAnnonce";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="">
        <Hero />
        <ListAnnonce />
        <Button className=" w-full my-10">
          <Link to="/events">View All Events</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
{
  /* <NextUIProvider>
        <div className=" w-4/5 mx-auto">
          <Navbar />
          <Hero />
          <ListAnnonce />
        </div>
      </NextUIProvider> */
}

// {showPost.map((item) => (
//   <p key={item.id}>{item.titre}</p>
// ))}
