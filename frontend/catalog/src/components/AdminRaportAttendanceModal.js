import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import Repartizare from "../data/Repartizare";
import { CSVLink } from "react-csv";
import Student from "../data/Student";
import Attendance from "../data/Attendance";
import { useState, useRef } from "react";

const AdminRaportAttendanceModal = (props) => {
  const [start_date, setStart_date] = useState("");
  const [final_date, setFinal_date] = useState("");
  const [clasa, setClasa] = useState("all");
  const [sumar, setSumar] = useState(true);
  const [detaliat, setDetaliat] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [csv, setCsv] = useState({ filename: "", headers: "", data: "" });
  const csvRef = useRef();

  const submit = async () => {
    debugger;
    if (start_date !== "" && final_date !== "") {
      let studentRes;
      if (clasa !== "all") studentRes = await Student.getByClass(clasa);
      else studentRes = await Student.getBySchoolYear();
      if (studentRes.ok) {
        let elevi = studentRes.elevi;
        if (sumar) {
          let headers = [
            { label: "Elev", key: "elev" },
            { label: "Clasa", key: "clasa" },
            { label: "Prezente", key: "prezente" },
            { label: "Absente Nemotivate", key: "absenteNemotivate" },
            { label: "Absente Motivate", key: "absenteMotivate" },
          ];
          let data = [];

          for (let i = 0; i < elevi.length; i++) {
            let attendanceRes = await Attendance.getByStudentAndPeriod(
              elevi[i].id_elev,
              start_date,
              final_date
            );
            if (attendanceRes.ok) {
              data.push({
                elev: elevi[i].nume + " " + elevi[i].prenume,
                clasa: elevi[i].numar_clasa
                  ? elevi[i].numar_clasa + " " + elevi[i].serie_clasa
                  : selectedClass.numar + " " + selectedClass.serie,
                prezente: attendanceRes.attendance.prezente,
                absenteNemotivate: attendanceRes.attendance.absenteNemotivate,
                absenteotivate: attendanceRes.attendance.absenteMotivate,
              });
            }
          }
          let csvObj = {
            filename: "Raport detaliat.csv",
            headers: headers,
            data: data,
          };
          setCsv(csvObj);
        } else if (detaliat) {
          let headers = [
            { label: "Elev", key: "elev" },
            { label: "Clasa", key: "clasa" },
            { label: "Tip participare", key: "tip_participare" },
            { label: "Data", key: "data" },
            { label: "Comentariu", key: "comentariu" },
          ];
          let data = [];

          for (let i = 0; i < elevi.length; i++) {
            let attendanceRes = await Attendance.getDetailsByPeriod(
              elevi[i].id_elev,
              start_date,
              final_date
            );
            if (attendanceRes.ok) {
              for (let j = 0; j < attendanceRes.attendance.length; i++) {
                data.push({
                  elev: elevi[i].nume + " " + elevi[i].prenume,
                  clasa: elevi[i].numar + " " + elevi[i].serie,
                  tip_participare: attendanceRes.attendance[j].tip_participare,
                  data: attendanceRes.attendance[j].data_participare,
                  comentariu: attendanceRes.attendance[j].comentariu,
                });
              }
            }
          }
          let csvObj = {
            filename: "Raport detaliat.csv",
            headers: headers,
            data: data,
          };
          setCsv(csvObj);
        }
      }
      document.getElementById("csv").click();
    }
  };

  const handleCheck = async (e) => {
    setSumar(!sumar);
    setDetaliat(!detaliat);
  };

  const handleChangeClass = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setClasa(optionElementId);
    setSelectedClass(e.target.value);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Adauga Repartizare</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Clasa</Form.Label>
            <Form.Control as="select" name="clasa" onChange={handleChangeClass}>
              <option id="all" selected>
                All
              </option>
              {props.clase.map((clasa) => {
                return (
                  <option id={clasa.id} value={clasa.numar + clasa.serie}>
                    {clasa.numar} {clasa.serie}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Perioada inceput</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setStart_date(e.target.value)}
              name="start_date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Perioada sfarsit</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setFinal_date(e.target.value)}
              name="final_date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="radio"
              onChange={handleCheck}
              name="sumar"
              inline
              label="Raport sumar"
              checked
            />
            <Form.Check
              type="radio"
              onChange={handleCheck}
              name="detaliat"
              label="Raport detaliat"
              inline
            />
          </Form.Group>
        </Form>

        <CSVLink id="csv" {...csv} ref={csvRef}>
          Exporta
        </CSVLink>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onHide()}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}></Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminRaportAttendanceModal;
