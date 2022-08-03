import { useState } from "react"
import { limitString } from "../../utils/limitString"
export const Card = ({
    deleteCard,
    editCardButton,
    card: {
        _id,
        createdAt,
        description,
        importance,
        status,
        title,
        user: { userName }
    },
    card 
}) => {
    const [showMore, setShowMore] = useState(false)

    const dateTime = new Date(createdAt).toLocaleString() + " hs."
    return (
        <div className="card">
            <div className="close" onClick={() => deleteCard(_id)}>X</div>
            <h3>{title}</h3>
            <h6>{dateTime}</h6>
            <h5>{userName}</h5>
            <button type="button" onClick={() => editCardButton(card, "status")}>{status.toLowerCase()}</button>
            <button type="button" onClick={() => editCardButton(card, "importance")}>{importance.toLowerCase()}</button>
            {!showMore && <p>{limitString(description).string}</p>}
            {showMore && <><p>{description}</p><button type="button" onClick={() => setShowMore(false)}>Ver menos</button></>}
            {!showMore && limitString(description).addButton &&
                <button type="button" onClick={() => setShowMore(true)}>
                    Ver más
                </button>
            }

        </div>

    )
}