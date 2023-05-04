import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../ItemsContext";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import ToDoList from "../components/ToDoList";
import InlineEdit from "../components/InlineEdit";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import PartsListVehicle from "./PartsListVehicle";
import Accordion from "../components/Accordion";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

function Vehicle() {
    const navigate = useNavigate();
    const { loading } = useContext(ItemsContext);
    const { vehicleID } = useParams();
    const [ storedPrice, setStoredPrice ] = useState('');
    const [ storedDate, setStoredDate ] = useState('');
    const [ storedTransmission, setStoredTransmission ] = useState('');
    const [ storedOdometer, setStoredOdometer ] = useState('');
    const [ storedVIN, setStoredVIN ] = useState('');
    const [ expanded, setExpanded ] = useState(false);
    const [ expandedToDo, setExpandedToDo ] = useState(false);

    const handleDelete = async ()  => {
        await db.vehicles.delete(Number(vehicleID));
        toast.success("Vehicle Deleted Successfully.");
        navigate("/vehicles");  
    };


	// const vehicle = db.vehicles.where("iod").equals(Number(vehicleID)).toArray();

    const vehicle = useLiveQuery(
      () => db.vehicles
        .where('id')
        .equals(Number(vehicleID))
        .toArray()
    );

    useEffect(() => { 
        if(vehicle) {
            setStoredPrice(vehicle[0].purprice ? vehicle[0].purprice : ''); 
            setStoredDate(vehicle[0].purdate ? vehicle[0].purdate : '');
            setStoredTransmission(vehicle[0].transmission ? vehicle[0].transmission : '');
            setStoredOdometer(vehicle[0].odometer ? vehicle[0].odometer : '');
            setStoredVIN(vehicle[0].vin ? vehicle[0].vin : ''); 
        }
    }, [vehicle]);

    return(
        <>
            {loading ? (
                "Loading..."
            ) : (!vehicle || vehicle.length < 1) ? (
                <p className="text-center m-5"> Nothing to display ☹️ </p>
            ) : (
                <>
                    <div className="veh-top">
                        <h1 key={vehicle[0].id}>
                            {vehicle[0].year} {vehicle[0].make} {vehicle[0].model} {vehicle[0].trim}
                        </h1>
                    </div>
                    <div className="veh-features">
                      <table className="veh-table">
                        <tbody>
                          <tr>
                            <td>Purchase Price</td>
                            <td>
                                $<InlineEdit
                                  form="vehicle"
                                  field="purprice"
                                  text={storedPrice}
                                  onSetText={(text) => setStoredPrice(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Purchase Date</td>
                            <td>
                                <InlineEdit
                                  form="vehicle"
                                  field="purdate"
                                  text={storedDate}
                                  onSetText={(text) => setStoredDate(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Transmission</td>
                            <td>
                                <InlineEdit
                                  form="vehicle"
                                  field="transmission"
                                  text={storedTransmission}
                                  onSetText={(text) => setStoredTransmission(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Odometer</td>
                            <td>
                                <InlineEdit
                                  form="vehicle"
                                  field="odometer"
                                  text={storedOdometer}
                                  onSetText={(text) => setStoredOdometer(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>VIN</td>
                            <td>
                                <InlineEdit
                                  form="vehicle"
                                  field="vin"
                                  text={storedVIN}
                                  onSetText={(text) => setStoredVIN(text)}
                                />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    <div className="todo-section">
                      <Accordion.Trigger
                        onClick={() => setExpandedToDo((prevExpanded) => !prevExpanded)}
                        expanded={expandedToDo}
                        showLabel="Show To Do List"
                        hideLabel="Hide To Do List"
                      />
                      <Accordion expanded={expandedToDo}>
                        <ToDoList />
                      </Accordion>
                    </div>

                    <div className="parts-section">
                      <Accordion.Trigger
                        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
                        expanded={expanded}
                        showLabel="Show Parts List"
                        hideLabel="Hide Parts List"
                      />
                      <Accordion expanded={expanded}>
                        <PartsListVehicle />
                      </Accordion>
                    </div>

                </>
            )}

            <div className="bottom-btns">
                <NavLink to="/vehicles">
                    <button type="button" className="btn btn-default btn-page">
                        <FontAwesomeIcon icon={faCaretLeft} /> Vehicles
                    </button>
                </NavLink>
                <div
                    className="btn-delete-icon btn-action"
                    onClick={handleDelete}
                    role="button"
                    onKeyDown={handleDelete}
                    tabIndex={0}
                >
                    <MdDelete /> Delete
                </div>
            </div>

        </>
    );
}

export default Vehicle;