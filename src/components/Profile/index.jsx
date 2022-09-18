import "./Profile.css"

const Profile = (props) => {
    return (
        <div>
            <h1 className="full-name">Full Name: {props.fullName}</h1>
            <h1 className="job-title">Position: {props.position}</h1>
            <h2 style={{backgroundColor:"aqua", color:"white"}} className="age">Age: {props.age}</h2>
        </div>
    )
}

export default Profile



