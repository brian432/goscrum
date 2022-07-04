export const Card = ({
    card: {
        createdAt,
        description,
        importance,
        status,
        title,
        user: { userName }
    }
}) => {
    return (

            <div className="card">
                <div className="close">X</div>
                <h3>{title}</h3>
                <h6>{createdAt}</h6>
                <h5>{userName}</h5>
                <button type="button">{status.toLowerCase()}</button>
                <button type="button">{importance.toLowerCase()}</button>
                <p>{description}</p>
            </div>

    )
}