import { Card, CardBody, Col, Row } from "react-bootstrap";

interface SaleSummaryWidgetsProps {
  saleSummaryWidgets: SaleSumaryWidgetType[];
}
const Widget = ({ saleSummaryWidgets }: SaleSummaryWidgetsProps) => {
  return (
    <Row>
      {saleSummaryWidgets.map((widgetData, idx) => {
        return (
          <Col lg={6} className="col-12 col-xl" key={idx}>
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="text-center">
                    <span className="h4">{widgetData.count}</span>
                    <h6 className="text-uppercase text-muted mt-2 m-0">{widgetData.title}</h6>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export const SaleWidget = Widget;

export type SaleSumaryWidgetType = {
  title: string;
  count: string;
};
