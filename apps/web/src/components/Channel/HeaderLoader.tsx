import ContentLoader from 'react-content-loader'

const Loader = (props: any) => {
  return (
    <ContentLoader
      viewBox="0 0 100 32"
      width="100"
      hight="32"
      backgroundColor="#aaa"
      foregroundColor="#888"
      {...props}
    >
      <rect x="2" y="10" rx="2" ry="2" width="86" height="18" />
    </ContentLoader>
  )
}

export default Loader
