import { Question } from '@prisma/client';
import './card.css';
import { useState } from 'react';
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
  IconCheck,
  IconFlagQuestion,
} from '@tabler/icons-react';

interface CardProps {
  question: Question;
}
export default function Card({ question }: CardProps) {
  const [flipped, setFlipped] = useState(false);
  const [know, setKnow] = useState(false);
  return (
    <div className="relative">
      <div
        className={`card h-full w-full relative  min-h-[450px] md:min-h-[360px] z-30 ${
          flipped && 'active'
        }`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="card-back text-sm w-full bg-purple-100 border border-purple-300 py-8 px-5  absolute min-h-full h-auto top-0 left-0 z-10 overflow-y-scroll flex items-center">
          <div className="h-full w-full overflow-y-scroll">
            <pre className="w-full text-wrap h-full overflow-y-scroll">
              <span style={{ fontFamily: 'Space Grotesk' }}>
                {question.answer}
              </span>
            </pre>
          </div>
        </div>
        <div className="card-front text-[14px] w-full bg-gray-100 border py-8 px-5 shadow-lg  z-20 min-h-full h-auto absolute top-0 left-0">
          <div className="h-full w-full overflow-y-scroll">
            <pre className="w-full text-wrap h-full overflow-y-scroll">
              <span style={{ fontFamily: 'Space Grotesk' }}>
                {question.question}
              </span>
            </pre>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 right-4 z-40">
        {know ? (
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
