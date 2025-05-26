import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Options from '../components/Options';
import LogoOnly from '../components/LogoOnly';
import ProgressBar from '../components/ProgressBar';
import PreviousButtonImg from '../assets/PreviousButton.svg'
import NextButtonImg from '../assets/NextButton.svg'
import LogoBig from '../components/LogoBig';
import Container from '../components/Container';
import ButtonGlass from '../components/ButtonGlass';
import LogoMain from '../components/LogoMain'
import LoadingBar from '../components/LoadingBar';

interface Option {
  oid: string;
  otext: string;
}

interface Question {
  qid: string;
  qtext: string;
  options: Option[];
  isSubmit?: boolean;
  submitted?: string;
  correct?: string;
}

interface Answer {
  qid: string;
  oid: string;
}

interface Explanations {
  qid: string;
  explanation_text: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  answers: Answer[];
  createdAt: string;
  explanations: Explanations[];
  __v?: number;
}

interface Res {
  quizdata: Quiz
  id: string
}

export default function Quiz() {

  const { state } = useLocation()
  //const state = "dummy_state"

  //const [data, setData] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSelected, setCurrentSelected] = useState<string | null>(null);
  const [quizID, setQuizID] = useState<string | null>(null)
  const location = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.post<Res>('/api/generateQuiz', { topic: state.topic, quizLength: state.quizLength, difficulty: state.difficulty }); ///api/getQuiz { quizId: quizID }
        const { quizdata, id } = response.data;

        //setData(quizdata);
        setQuestions(quizdata.questions);
        setQuizID(id);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An Unknown Error Occurred.');
        }
        setLoading(false);
      }
    };
    getQuiz();
  }, [location]);

  useEffect(() => {
    if (index + 1 === questions.length && questions[index].isSubmit) {
      const result = questions.filter((q) => q.submitted === q.correct)
      const score = result.length
      navigate('/result', { state: { "score": score, "total": questions.length, "quizId": quizID } })
    }
  }, [questions, index, navigate])



  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setCurrentSelected(null); // Reset selected option on next question
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setCurrentSelected(null); // Reset selected option on previous question
    }
  };

  const handleOptionSelect = (oid: string) => {
    setCurrentSelected(oid);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/check', { 'option': currentSelected, 'quizId': quizID, 'index': index })
      if (response.data.message == "correct") {
        // Mark the current question as submitted
        // Ensure currentQuestion is not null before setting it
        setQuestions(prevQuestions => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index] = { ...updatedQuestions[index], isSubmit: true };
          updatedQuestions[index] = { ...updatedQuestions[index], submitted: response.data.answer };
          updatedQuestions[index] = { ...updatedQuestions[index], correct: response.data.answer };
          return updatedQuestions;
        });
      }
      if (response.data.message == "wrong") {
        // Mark the current question as submitted
        // Ensure currentQuestion is not null before setting it
        setQuestions(prevQuestions => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index] = { ...updatedQuestions[index], isSubmit: true };
          updatedQuestions[index] = { ...updatedQuestions[index], submitted: currentSelected ? currentSelected : "currentSelected null error" };
          updatedQuestions[index] = { ...updatedQuestions[index], correct: response.data.answer };
          return updatedQuestions;
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An Unknown Error Occurred.');
      }
    }
  }

  if (loading) return (
    <div className='bg-image flex flex-col items-center justify-center'>
      <Container className='flex flex-col items-center mx-8 gap-y-4'>
        <LogoMain cstyles='h-32 md:h-44' />
          <LoadingBar></LoadingBar>
          <h2 className='text-white text-lg'>Letting AI build your quiz — hang tight!</h2>
        </Container>
      </div>
  )
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='bg-image p-6 flex flex-col gap-y-8'>
      <header>
      <LogoOnly cstyles='h-20 md:hidden' />
      <LogoBig cstyles='hidden md:block' />
      </header>
        <ProgressBar pindex={index+1} plength={questions.length}/>
      <div className='flex grow items-center justify-center'>
        <Container className='flex flex-col gap-y-6'>
          <h3 className='glassmorph-blur text-white p-2'>{questions[index].qtext}</h3>
          {
            questions[index].isSubmit ? (
              <div className='md:grid md:grid-cols-2 md:gap-4'>
                {questions[index].options.map((option) => (
                  <div className={questions[index].correct === option.oid ?
                    'glassmorph-green flex p-2 my-3 md:my-0'
                    : option.oid === questions[index].submitted && questions[index].submitted != questions[index].correct
                      ? 'glassmorph-red flex p-2 my-3 md:my-0'
                      : 'glassmorph-blur flex p-2 my-3 md:my-0'}
                    key={option.oid}>
                    <label className='text-white'>
                      <input
                        type='radio'
                        name='options'
                        value={option.oid}
                      />{' '}
                      {option.otext}
                    </label>
                  </div>
                ))}
              </div>
            ) :
              (
                <Options options={questions[index].options} onOptionSelect={handleOptionSelect} />
              )

          }
          <div id='action-buttons' className='flex items-center justify-between'>
            <button className='w-14' onClick={handlePrevious} disabled={index === 0}>
              <img src={PreviousButtonImg} />
            </button>

            <ButtonGlass disabled={currentSelected===null} onClick={() => { handleSubmit() }}>Submit</ButtonGlass>
            
            <button className='w-14' onClick={handleNext} disabled={index === questions.length - 1}>
              <img src={NextButtonImg} />
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
}

/*
 
<div className='bg-image h-svh p-6'>
      <header>
      <LogoOnly cstyles='h-20 md:hidden' />
      <LogoBig cstyles='hidden md:block' />
      </header>
      
      <main className='flex flex-col'>
        <div className='my-8'>
          <ProgressBar pindex={index+1} plength={questions.length}/>
        </div>
        <div className='bg-white bg-opacity-75 shadow-lg rounded-lg my-6 p-6 flex flex-col justify-center'>
          {
            questions[index].isSubmit ? (
              <div>
                <h3 className='my-3'>{questions[index].qtext}</h3>
                <div className='md:grid md:grid-cols-2'>
                  {questions[index].options.map((option) => (
                    <div className={questions[index].correct === option.oid ?
                      'border-green-500 border-2 p-2 flex m-3 rounded-md'
                      : option.oid === questions[index].submitted && questions[index].submitted != questions[index].correct
                        ? 'border-red-500 border-2 p-2 flex m-3 rounded-md'
                        : 'border-2 border-[#94819E] p-2 flex m-3 rounded-md'}
                      key={option.oid}>
                      <label>
                        <input
                          type='radio'
                          name='options'
                          value={option.oid}
                        />{' '}
                        {option.otext}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <div>
                <h3 className='my-3'>{questions[index].qtext}</h3>
                <Options options={questions[index].options} onOptionSelect={handleOptionSelect} />
              </div>
            )
          }
          {
        questions[index].isSubmit ? (
          <div>
            {
          }
          </div>
        ) :
          (
            <div className='self-center my-3'>
              <button className='bg-[#623878] disabled:bg-[#d7b1eb] px-6 py-2 text-white rounded-md' disabled={currentSelected===null} onClick={() => { handleSubmit() }}>Submit</button>
            </div>
          )
      }
        </div>
      </main>

      <footer className='flex justify-around'>
      <button onClick={handlePrevious} disabled={index === 0}>
          <img src={PreviousButtonImg}/>
        </button>
        <button onClick={handleNext} disabled={index === questions.length - 1}>
          <img src={NextButtonImg}/>
        </button>
      </footer>
    </div>
  );

 */

/**
  
<div>


      <LogoMain cstyles='h-24 md:h-64' />
      <br />
      <p>Question:{`${index+1}/${questions.length}`}</p>
      <h3>{data?.title}</h3>
      <p>{data?.description}</p>


      {questions[index].isSubmit ? (
        <div>
          <h3>{questions[index].qtext}</h3>
          <ul>
            {questions[index].options.map((option) => (
                <li className={questions[index].correct === option.oid ? 
                  'border-green-500 border-2 p-2' 
                  : option.oid === questions[index].submitted && questions[index].submitted != questions[index].correct 
                  ? 'border-red-500 border-2 p-2'
                  : ''  } 
                key={option.oid}>
                  <input
                    type='radio'
                    name='options'
                    value={option.oid}
                  />{' '}
                  {option.otext}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>{questions[index].qtext}</h3>
          <Options options={questions[index].options} onOptionSelect={handleOptionSelect} />
        </div>
      )}


      <div>
        <button onClick={handlePrevious} disabled={index === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={index === questions.length - 1}>
          Next
        </button>
      </div>
      {
        questions[index].isSubmit ? (
          <div>
            {
          }
          </div>
        ) :
          (
            <button onClick={() => { handleSubmit() }}>Submit</button>
          )
      }

    </div>


 */