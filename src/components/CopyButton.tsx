import { useState } from "react";

interface ICopyButton {
    link: string;
    children: string;
}

const CopyButton = ({ link, children }: ICopyButton) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                setClicked(true);
                setTimeout(() => {
                    setClicked(false);
                }, 500);
            })
            .catch((error) => {
                console.error("Error al copiar el texto:", error);
            });
    };

    return (
        <button className="copybutton gradient-pink" onClick={handleCopy}>
            {children}
            {clicked && <span>Copiado</span>}
        </button>
    );
};

export default CopyButton;
