// NextJS
import Loading from '@/components/loading'
import * as React from 'react'

export default function Page() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const response = await fetch('https://api.nya.com/weather');
        const result = await response;
        setData(result);
      } catch (error) {
        console.error("データの取得に失敗しました:", error.message);
      }
    };
    fetchData();
  }, []);
  const weatherData = JSON.stringify(data)
  const weather = weatherData.clouds.all > 20 ? "晴れ" : "曇り"
  if (loading == true){
    return <Loading />
  }
  return (
    {data ?
      <div>
        <h1>今日の天気</h1>
        <div>{weater}</div>
      </div>
      : <div>データがありません</div>
    }
  );
}