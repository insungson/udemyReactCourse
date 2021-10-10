import Layout from "../components/layout/Layout";
import "../styles/globals.css";
//이파일이 root 컴포넌트가 된다. 그러므로 layout에 대한 스타일을 정의하고 앱 전체로 적용시키려면
// 여기서 처리하는게 맞다!!
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
