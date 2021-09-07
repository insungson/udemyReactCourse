// div 태그로 감싸는건 항상 좋은게 아니다..
// 그래서 children 을 사용하여 아래와 같이 div 대신 감쌀
// 커스텀한 컴포넌트를 만들어보자
const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;
