import ContentLoader from 'react-content-loader'

const Loader = (props: any) => {
  return (
    <ContentLoader
      viewBox="0 0 100 400"
      backgroundColor="#aaa"
      foregroundColor="#888"
      {...props}
    >
      <rect x="10" y="5" rx="5" ry="5" width="60" height="60" />
      <rect x="10" y="70" rx="5" ry="5" width="60" height="60" />
      <rect x="10" y="138" rx="5" ry="5" width="60" height="60" />
    </ContentLoader>
  )
}

export default Loader
