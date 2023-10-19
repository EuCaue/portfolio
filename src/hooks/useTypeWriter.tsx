import { useState, useEffect } from 'react';

type ReturnUseTypeWriter = {
  currentWord: number;
  collapseClass: string;
};

export default function useTypeWriter(
  words: string[],
  defaultCollapseClass: string = ' w-0',
  expandCollapseClass: string = ' w-48 lg:w-72'
): ReturnUseTypeWriter {
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [collapseClass, setCollapseClass] =
    useState<string>(defaultCollapseClass);

  useEffect(() => {
    setTimeout(() => setCollapseClass(expandCollapseClass), 100);
    const incrementWord: () => Promise<void> = async () => {
      setCollapseClass(defaultCollapseClass);
      setTimeout(() => {
        setCurrentWord((oldVal) => {
          let wordIndex: number;
          if (oldVal >= words.length - 1) {
            wordIndex = 0;
          } else {
            wordIndex = oldVal + 1;
          }
          return wordIndex;
        });
      }, 1100);
      setTimeout(() => {
        setCollapseClass(expandCollapseClass);
      }, 1000);
    };

    const id = setInterval(incrementWord, 4000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { currentWord, collapseClass };
}
