import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    // Change le titre au montage du composant
    document.title = title ? `${title} | Kit'n ALika` : "Kit'n ALika";
  }, [title]); // Se met à jour si le titre change (ex: article dynamique)
}
