import ShuffleHero from "../components/HeroSection/SuffleHero";
import Footer from "../components/footer/Footer";


const HomePage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <ShuffleHero></ShuffleHero>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;