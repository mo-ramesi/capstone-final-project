const Banner = ({image, title, subtitle, CN}) => {
    return (
        <article className={CN}
          style={{background: `url('${image}') no-repeat 0% 70%`}}
        >
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
        </article>
    )
}

export default Banner;