import ContentLoader from 'react-content-loader'

const Loader = (props: any) => {
  return (
    <ContentLoader
      viewBox="0 0 100% 100%"
      backgroundColor="#aaa"
      foregroundColor="#888"
      {...props}
    >
      <rect x="10" y="14" rx="2" ry="2" width="86" height="14" />
    </ContentLoader>
  )
}

export default Loader
