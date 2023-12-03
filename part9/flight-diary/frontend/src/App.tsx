import { useState, useEffect } from "react";
import { DiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaries, createDiaryEntry } from "./diaryService";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  // Instead of using TYPE ASSERTION for "" as the enum
  // We can set the type of the state to be either the enum or null:
  // const [visibility, setVisibility] = useState<Visibility | null>(null);
  // const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility>("" as Visibility);
  const [weather, setWeather] = useState<Weather>("" as Weather);
  const [comment, setComment] = useState("");
  // Specify type of useState functions if possible:
  // const [message, setMessage] = useState<string | null>(null)
  const [message, setMessage] = useState("");

  // My solution only uses notifyWith once
  // So I didn't bother to create a separate function.
  // Model solutions used it twice due to checking for presence of
  // 'visibility' and 'weather' when adding diary
  // However, advisable to refactor into separate function
  // and set state here.
  // const notifyWith = (message: string) => {
  //   setError(message);
  //   setTimeout(() => {
  //     setError(null);
  //   }, 5000);
  // };

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  });

  // This will help TypeScript to know that the weathers
  // and visibilities options used in the rdio buttons
  // are of the enum Weather and Visibility.
  // Thus, removing the need to narrow and hardecode values afterwards.
  // const weathers = Object.values(Weather);
  // const visibilities = Object.values(Visibility);

  // Solution does not use async await syntax?
  const createDiary = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      // Before adding diary, check if visibility and weather are present:
      // if ( !visibility || !weather) {
      //   notifyWith('visibility and weather must be set');
      //   return
      // }

      // Solution creates const object: NewDiaryEntry = {}
      await createDiaryEntry({ date, visibility, weather, comment }).then(
        (data) => {
          setDiaries(diaries.concat(data));
        }
      );
      // You can choose to move this into .then block
      setDate("");
      setVisibility("" as Visibility);
      setWeather("" as Weather);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Further check for presence of error.response.data
        // before setting to 'message':
        // `const message = error.response && error.response.data`
        // My solution replaces "Something went wrong. " directly in the backend.
        // Alternatively, replace it here in the frontend.
        //   `? error.response.data.replace("Something went wrong. ", "")
        //   : "Addition failed, reason unknown...";`

        // Refactor notification to function "notifyWith(message)";
        setMessage(error.response.data);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {/* Can choose to directly implement Notification here 
      since it is only used here */}
      {/* {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>} */}
      <Notification message={message} />
      <form onSubmit={createDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        {/* Instead of harcoding all the options of the radio buttons,
        we can use a map function instead: */}
        {/* <div>
              // This is to create the indentatation,
              // which I achieved using &emsp; instead
              <span style={{ marginRight: 15 }}>visibility</span>
              {visibilities.map((v) => (
                <span key={v}>
                  {v}{" "}
                  <input
                    checked={v === visibility}
                    type="radio"
                    name="visibility"
                    onChange={() => setVisibility(v)}
                  />
                </span>
              ))}
            </div> */}
        <div>
          visibility&emsp;great
          <input
            type="radio"
            name="visibility"
            value="great"
            // Checked attribute used to reset form after submit
            // by unchecking it when visibility is set to null
            checked={visibility === Visibility.Great}
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input
            type="radio"
            name="visibility"
            value="good"
            checked={visibility === Visibility.Good}
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
          <input
            type="radio"
            name="visibility"
            value="ok"
            checked={visibility === Visibility.Ok}
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor
          <input
            type="radio"
            name="visibility"
            value="poor"
            checked={visibility === Visibility.Poor}
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          weather&emsp;sunny
          <input
            type="radio"
            name="weather"
            value="sunny"
            checked={weather === Weather.Sunny}
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy
          <input
            type="radio"
            name="weather"
            value="rainy"
            checked={weather === Weather.Rainy}
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            checked={weather === Weather.Cloudy}
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
          <input
            type="radio"
            name="weather"
            value="stormy"
            checked={weather === Weather.Stormy}
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
          <input
            type="radio"
            name="weather"
            value="windy"
            checked={weather === Weather.Windy}
            onChange={() => setWeather(Weather.Windy)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        // Refactor this into <Diary key={d.id} entry={d}/> component
        <div key={diary.id}>
          <p>
            <strong>{diary.date}</strong>
          </p>
          {/* Instead of using <br />, wrap it in <div></div>*/}
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
};

export default App;
