export const getServerSideProps = () => {
  console.log(111);
  return {
      props: {
          dateNow: new Date().toLocaleTimeString(),
      }
  }
}


const Home = () => {
  return (
    <h1>home</h1>
  );
};

export default Home;
