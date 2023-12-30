import HashLoader from 'react-spinners/HashLoader'

type Props = {}

export function Loader({}: Props) {
  return (
    <div className="grid min-h-screen place-content-center  pb-20">
      <HashLoader color="#D946EF" size={200} />
    </div>
  )
}
