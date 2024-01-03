import { Know, Question } from '@prisma/client';
import './card.css';
import { useEffect, useState } from 'react';
import { IconCheck, IconFlagQuestion } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import ServerMessage from '../forms/serverMessage';

interface QuestionWithKnows extends Question {
  knows: Know[];
}

interface CardProps {
  question: QuestionWithKnows;
  [key: string]: any;
}
export default function Card({
  question,
  setIndex,
  setFlipped,
  flipped,
}: CardProps) {
  const { data: session } = useSession();
  // const [flipped, setFlipped] = useState(false);
  const [know, setKnow] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleKnow = async () => {
    if (!know) {
      await fetch('/api/knows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: question.id,
          userId: session?.user?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          if (data.know) {
            setKnow(true);
          }
        })
        .catch((err) => console.log(err));
    }

    if (know) {
      await fetch(`/api/knows/${question.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: question.id,
          userId: session?.user?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          if (data.ok) {
            setKnow(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetch(`/api/knows/${question.id}`)
      .then((res) => res.json())
      .then((data) => data.know && setKnow(true));
    // .catch((err) => setMessage(err.message));
    if (message) {
      setTimeout(() => {
        setShow(true);
      }, 500);
    }
    setShow(false);
  }, [setMessage, setKnow, setIndex, question]);

  return (
    <div className="relative">
      <div
        className={`card h-full w-full relative  min-h-[450px] md:min-h-[360px] z-20 ${
          flipped && 'active'
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="card-back text-sm w-full bg-purple-100 border border-purple-300 py-8 px-5  absolute min-h-full h-auto top-0 left-0 z-10  flex items-center">
          <div className="h-full w-full overflow-y-auto">
            <pre className="w-full text-wrap h-full">
              <span style={{ fontFamily: 'Space Grotesk' }}>
                {question.answer}
              </span>
            </pre>
          </div>
        </div>
        <div className="card-front text-[14px] w-full bg-gray-100 border py-8 px-5 shadow-lg  z-20 min-h-full h-auto absolute top-0 left-0">
          <div className="h-full w-full overflow-y-auto">
            <pre className="w-full text-wrap h-full">
              <span style={{ fontFamily: 'Space Grotesk' }}>
                {question.question}
              </span>
            </pre>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-3 right-4 z-30 cursor-pointer"
        onClick={handleKnow}
      >
        {message ? (
          <ServerMessage mode="save" message={message} addClass="mb-2" />
        ) : null}
        {know &&
        question.knows.filter((k) => k.userId == session?.user.id).length >
          0 ? (
          <div className="flex items-center  gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-green-600 hover:bg-green-300">
              <IconCheck size="12" color="rgb(22 163 74)" />
            </div>
            <span className="text-xs w-30">Yes, I know this one!</span>
          </div>
        ) : (
          <div className="flex items-center  gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-purple-600 hover:bg-purple-300">
              <IconFlagQuestion size="12" color="rgb(147 51 234)" />
            </div>
            <span className="text-xs w-30">I need more work!</span>
          </div>
        )}
      </div>
    </div>
  );
}
