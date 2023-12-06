// thx for https://zenn.dev/ryota0222/articles/d574bae11306b0
import React, { useRef, useCallback } from 'react';

const modal_class = "image-dialog-open"
interface Props {
  /**
   * 画像のURL
   */
  src: string;
  /**
   * 画像の代替テキスト
   */
  alt?: string;
}
export function ImageDialog({ src, alt = '' }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);
  /**
   * ダイアローグを開く処理
   */
  const handleOpenDialog = useCallback(() => {
    if (ref.current) {
        ref.current.showModal()
        ref.current.classList.add(modal_class)
    }
  }, [ref]);
  /**
   * ダイアローグを閉じる処理
   */
  const handleCloseDialog = useCallback(() => {
    if (ref.current) {
        ref.current.classList.remove(modal_class)
        ref.current.close();
    }
  }, [ref]);
  /**
   * ダイアローグ内のクリックイベントハンドラーに渡す処理
   */
  const handleClickInDialog = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );
  return (
    <React.Fragment>
      <div
        role="button"
        onClick={handleOpenDialog}
        onKeyDown={handleOpenDialog}
        className="image-box"
        tabIndex={0}
      >
        <img src={src} alt={alt} className="mdimg" />
      </div>
      <dialog ref={ref} className="image-dialog" onClick={handleCloseDialog}>
        <div onClick={handleClickInDialog} className="contents">
          <img src={src} alt={alt} className="mdpreview" />
        </div>
      </dialog>
    </React.Fragment>
  );
};
