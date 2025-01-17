import React, { useState } from "react"
import "../../styles/cmsSnippets/parkInfoPage.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import Heading from "./heading"
import HtmlContent from "./htmlContent"
import StaticIcon from "./staticIcon"
import { navigate } from "gatsby"

function toCamping() {
  navigate("https://camping.bcparks.ca/");
}

export default function CampingDetails({ data }) {
  const campingFacilities = data.parkFacilities.filter(facility =>
    facility.facilityType.facilityName.toLowerCase().includes("camping")
  )
  const [reservationsExpanded, setReservationsExpanded] = useState(false)
  const [expanded, setExpanded] = useState(Array(campingFacilities.length).fill(false))

  if (campingFacilities.length === 0) return null

  const toggleExpand = index => {
    expanded[index] = !expanded[index]
    setExpanded([...expanded])
  }

  const toggleReservations = () => {
    setReservationsExpanded(!reservationsExpanded);
  }

  return (
    <div className="mb-5">
      <Row
        id="park-camping-details-container"
        className="anchor-link d-flex justify-content-between"
      >
        {data.hasReservations && (
          <Col lg={{ span: 4, order: 'last' }} xl={3} md={{ span: 12, order: 'first' }}
            className="mb-3">
            <button
              className="btn btn-warning btn-block booking-button p-2"
              onClick={() => toCamping()}
            >
              Book a campsite
            </button>
          </Col>
        )}
        <Col md={{ order: 'last' }} lg={{ order: 'first' }}>
          <Heading>Camping</Heading>
        </Col>
      </Row>
      <Row>
        <Col>
          {campingFacilities.length > 0 && (
            <div id="park-camping-list-container" className="anchor-link">
              {data.reservations && (
                <div key="reservation">
                  <Accordion
                    key="reservations"
                    aria-controls="reservations"
                    className="park-details mb-2"
                  >
                    <Accordion.Toggle as={Container}
                      eventKey="0"
                      id="panel1a-header"
                      onClick={() => toggleReservations()}
                    >
                      <div className="d-flex justify-content-between p-3 accordion-toggle">
                        <HtmlContent className="accordion-header pl-2">Reservations</HtmlContent>
                        <div className="d-flex align-items-center expand-icon">
                          <i className={(reservationsExpanded ? "open " : "close ") + "fa fa-angle-down mx-3"}></i>
                        </div>
                      </div>
                    </Accordion.Toggle>

                    <Accordion.Collapse
                      eventKey="0"
                    >
                      <div className="p-3 pl-5">
                        <HtmlContent>{data.reservations}</HtmlContent>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {campingFacilities.map((facility, index) => (
            <Accordion
              key={"campingFacility" + index}
              className="park-details mb-2"
            >
              <Accordion.Toggle as={Container}
                aria-controls={facility.facilityType.facilityName}
                eventKey="0"
                id={index}
                onClick={() => toggleExpand(index)}
              >
                <div className="d-flex justify-content-between p-3 accordion-toggle">
                  <div className="d-flex justify-content-left align-items-center pl-2">
                    <StaticIcon name={facility.facilityType.icon} size={48} />
                    <HtmlContent className="pl-3 accordion-header">{facility.facilityType.facilityName}</HtmlContent>
                  </div>
                  <div className="d-flex align-items-center expand-icon">
                    <i className={(expanded[index] ? "open " : "close ") + "fa fa-angle-down mx-3"}></i>
                  </div>
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse
                eventKey="0"
              >
                <div className="p-4">
                  <HtmlContent>{facility.description}</HtmlContent>
                </div>
              </Accordion.Collapse>
            </Accordion>
          ))}
        </Col>
      </Row>
    </div>
  )
}
