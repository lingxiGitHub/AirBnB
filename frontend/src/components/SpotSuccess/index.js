import "./SpotSuccess.css";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";



export default function SpotSuccess({ show }){
    
    if (!show) {
        return null;
    }

    return(
      
        <>
          <p>Your reservation is booked successfully</p>
            <NavLink exact to="/trips" className="see-trips">View Your Trips</NavLink>
        </>
    )
}