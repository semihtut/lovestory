import React, { useEffect } from 'react';

interface Props {
  message: string;
  onDone: () => void;
}

export default function HeartToast({ message, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <div className="heart-toast">{message}</div>;
}
