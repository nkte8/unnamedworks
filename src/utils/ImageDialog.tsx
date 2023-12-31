// thx for https://zenn.dev/ryota0222/articles/d574bae11306b0
import React, { useRef, useCallback } from 'react';

const modal_class = "image-dialog-open"
interface Props {
    src: string;
    alt?: string;
    usepicture?: boolean;
}
export function ImageDialog({ src, alt = '', usepicture = false }: Props) {
    const ref = useRef<HTMLDialogElement | null>(null);

    const handleOpenDialog = useCallback(() => {
        if (ref.current) {
            ref.current.showModal()
            ref.current.classList.add(modal_class)
        }
    }, [ref]);

    const handleCloseDialog = useCallback(() => {
        if (ref.current) {
            ref.current.classList.remove(modal_class)
            ref.current.close();
        }
    }, [ref]);

    const handleClickInDialog = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
        },
        []
    );
    return (
        <React.Fragment>
            <span
                role="button"
                onClick={handleOpenDialog}
                onKeyDown={handleOpenDialog}
                className="image-box"
                tabIndex={0}
            >
                {
                    usepicture &&
                    <picture>
                        <source srcSet={src + ".webp"} type="image/webp" />
                        <img src={src + ".png"} decoding="auto" alt={alt} className="mdimg" />
                    </picture>
                }
                {
                    !usepicture &&
                    <img src={src} decoding="auto" alt={alt} className="mdimg" />
                }
            </span>
            <dialog ref={ref} className="image-dialog" onClick={handleCloseDialog}>
                <div onClick={handleClickInDialog} className="contents">
                    {
                        usepicture &&
                        <picture>
                            <source srcSet={src + ".webp"} type="image/webp" />
                            <img src={src + ".png"} decoding="auto" alt={alt} className="mdpreview" />
                        </picture>
                    }
                    {
                        !usepicture &&
                        <img src={src} decoding="auto" alt={alt} className="mdpreview" />
                    }
                </div>
            </dialog>
        </React.Fragment>
    );
};
