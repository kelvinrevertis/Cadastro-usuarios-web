export default function Home() {
  return (
    <h1>Vc não deveria entrar aqui!</h1>
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3333/')
    const data = await response.json()

    console.log(data)

    return {
      redirect: {
        permanent: false,
        destination: `/signin`
      },
      props: {}
    }
  } catch (error) {
    console.log(error)
    return {
      props: {}
    }
  }
}



