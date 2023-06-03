

function Home() {
    return (
        <>
            <div className="landing--container">
                <h1 className="landing--title">
                    Hoober
                </h1>
                <h3 style={{ fontSize: "30px", color: "#F4EEE0" }}>
                    <em>UVA Carpooling App</em>
                </h3>
            </div>
            <div className="about--section">
                <h1>
                    What is this website?
                </h1>
                <p className='about--description'>
                    During my UVA first year, I realized how hard it was to sometimes find rides back home to Northern Virginia, to other in-state cities like Richmond or Blacksburg, or even to out-of-state destinations.
                    This is just a simple web app that UVA students can use to connect to other people who are offering rides back who might share a hometown, or whose hometown might
                    be on the way. The backend was mostly Express and Next.js, which I also wrote a RESTful API with, and the frontend was all React and Next.js.
                </p>
            </div>

        </>
    )
}
export default Home;