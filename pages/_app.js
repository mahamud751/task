import Layout from "../components/common/layout";
import "../styles/globals.css";
import "react-day-picker/dist/style.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
