import ContentLoader from 'react-content-loader'

const Loader = (props: any) => {
  return (
    <ContentLoader
      viewBox="0 0 160 400"
      backgroundColor="#aaa"
      foregroundColor="#888"
      {...props}
    >
      <rect x="4" y="5" rx="3" ry="3" width="60" height="12" />
      <rect x="4" y="22" rx="3" ry="3" width="70" height="10" />

      <rect x="4" y="35" rx="3" ry="3" width="60" height="8" />
      <rect x="4" y="47" rx="3" ry="3" width="60" height="8" />
      <rect x="4" y="59" rx="3" ry="3" width="60" height="8" />
      <rect x="4" y="71" rx="3" ry="3" width="60" height="8" />
      <rect x="4" y="83" rx="3" ry="3" width="60" height="8" />
      <rect x="4" y="94" rx="3" ry="3" width="60" height="8" />
    </ContentLoader>
  )
}

export default Loader
