import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemsContext } from "../ItemsContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import InlineEdit from "../components/InlineEdit";
import Form from 'react-bootstrap/Form';
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

function Part() {
    const { updatePart, loading } = useContext(ItemsContext);
    const { partID } = useParams();
    const [ storedPart, setStoredPart ] = useState('');
    const [ storedPartNo, setStoredPartNo ] = useState('');
    const [ storedVendor, setStoredVendor ] = useState('');
    const [ storedLink, setStoredLink ] = useState('');
    const [ storedPriceUnit, setStoredPriceUnit ] = useState('');
    const [ storedQuantity, setStoredQuantity ] = useState('');
    const [ storedTotal, setStoredTotal ] = useState('');
    const [ storedVehicleID, setStoredVehicleID ] = useState('');

    const navigate = useNavigate();
  
    const getVehicleList = () => {
        return vehicles.map((vehicle, indx) => {
            return <option key={indx} value={vehicle.id}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</option>;
        })
    };
 
    const handleVehicleChange = e => {
        setStoredVehicleID(e.target.value);
        updatePart(partID,'veh_id',e.target.value);
    };

    const handleDelete = async () => {
        await db.partslist.delete(Number(partID));
        toast.success("Part Deleted Successfully.");
        navigate("/partslist");  
    };

    const part = useLiveQuery(
      () => db.partslist
        .where('id')
        .equals(Number(partID))
        .toArray()
    );

	const vehicles = useLiveQuery( () => db.vehicles.toArray() );

	useEffect(() => { 
        let total = 0;

        if(part) {
            setStoredPart(part[0].part ? part[0].part: ''); 
            setStoredPartNo(part[0].part_no ? part[0].part_no: '');
            setStoredVendor(part[0].vendor ? part[0].vendor: '');
            setStoredLink(part[0].url ? part[0].url: '');
            setStoredPriceUnit(part[0].price_unit ? part[0].price_unit: '');
            setStoredQuantity(part[0].quantity ? part[0].quantity: '');
            setStoredVehicleID(part[0].veh_id ? part[0].veh_id: '');

            if(part[0].price_unit && part[0].quantity)
                total = part[0].price_unit * part[0].quantity;
            setStoredTotal(total); 
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [part]);

    return(
        <>
            {loading ? (
                "Loading..."
            ) : (!part || part[0].length < 1) ? (
                <p className="text-center m-5"> Nothing to display ☹️ </p>
            ) : (
                <>
                    <div className="veh-features">
                      <table className="veh-table">
                        <tbody>
                          <tr>
                            <td>Part</td>
                            <td>
                                <InlineEdit
                                  form="part"
                                  field="part"
                                  text={storedPart}
                                  onSetText={(text) => setStoredPart(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Part Number</td>
                            <td>
                                <InlineEdit
                                  form="part"
                                  field="part_no"
                                  text={storedPartNo}
                                  onSetText={(text) => setStoredPartNo(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Vehicle</td>
                            <td>
                              <Form.Group className="mb-3">
                                <Form.Select name="vehicleSelect" value={storedVehicleID} onChange={handleVehicleChange} >
                                  <option>Select Vehicle</option>
                                  { vehicles ? getVehicleList() : '' }
                                </Form.Select>
                              </Form.Group>    
                            </td>
                         </tr>
                          <tr>
                            <td>Vendor</td>
                            <td>
                                <InlineEdit
                                  form="part"
                                  field="vendor"
                                  text={storedVendor}
                                  onSetText={(text) => setStoredVendor(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Link</td>
                            <td>
                                <InlineEdit
                                  form="part"
                                  field="url"
                                  text={storedLink}
                                  onSetText={(text) => setStoredLink(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Price Per Unit</td>
                            <td>$
                                <InlineEdit
                                  form="part"
                                  field="price_unit"
                                  text={storedPriceUnit}
                                  onSetText={(text) => setStoredPriceUnit(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Quantity</td>
                            <td>
                                <InlineEdit
                                  form="part"
                                  field="quantity"
                                  text={storedQuantity}
                                  onSetText={(text) => setStoredQuantity(text)}
                                />
                            </td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>${storedTotal}</td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                </>
            )}

        <div className="bottom-btns">
            <Link to={-1}>
                <button type="button" className="btn btn-default btn-page">
                    <FontAwesomeIcon icon={faCaretLeft} /> Go Back
                </button>
            </Link>
            <div
                className="deleteIcon"
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

export default Part;