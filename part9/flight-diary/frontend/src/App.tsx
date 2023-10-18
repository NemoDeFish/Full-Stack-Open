import { useState, useEffect } from "react";
import { DiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaries, createDiaryEntry } from "./diaryService";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("" as Visibility);
  const [weather, setWeather] = useState<Weather>("" as Weather);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  });

  const createDiary = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      await createDiaryEntry({ date, visibility, weather, comment }).then(
        (data) => {
          setDiaries(diaries.concat(data));
        }
      );
      setDate("");
      setVisibility("" as Visibility);
      setWeather("" as Weather);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
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
        <div>
          visibility&emsp;great
          <input
            type="radio"
            name="visibility"
            value="great"
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
        <div key={diary.id}>
          <p>
            <strong>{diary.date}</strong>
          </p>
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
        </div>
      ))}
    </div>
  );
};

export default App;
