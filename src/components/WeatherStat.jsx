const WeatherStat = ({icon,value,unit}) => {
  return (
    <div className="flex gap-2 items-center">
        <img src={icon} alt="" className="w-5"/>
        <span>{value}{unit}</span>
    </div>
  )
}
export default WeatherStat;