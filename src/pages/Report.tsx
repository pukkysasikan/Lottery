import React, { useState, useEffect } from "react";
import http from "../utils/AxiosUtils";

export default function getReport() {
  const [data, setData] = useState<any>([]);
  const [header, setHeader] = useState<any>([]);
  const [type, setType] = useState<any>("");
  const twoDigit = ["เลข", "บน", "ล่าง"];
  const threeDigit = ["เลข", "ตรง", "โต๊ด", "ล่าง"];

  const getLottoryOrder = async (id: string) => {
    const res = await http.get("/lottories");
    if (res && res.status === 200) {
      setData(formatData(res.data.data, id));
    }
  };

  const formatData = (data: any, id: string) => {
    const uniqueNumber = data.map((item: any) => item.number);
    const uniqueNumberSet = new Set(uniqueNumber);
    // sum of each number
    const sumOfNumber = Array.from(uniqueNumberSet).map((item: any) => {
      if (id === "3" && item.length === 3) {
        setHeader(threeDigit);
        return {
          number: item,
          upper: data
            .filter((d: any) => d.number === item)
            .reduce((acc: any, curr: any) => Number(acc) + Number(curr.two_digit), 0),
          lower: data
            .filter((d: any) => d.number === item)
            .reduce((acc: any, curr: any) => Number(acc) + Number(curr.lower), 0),
          straight: data
            .filter((d: any) => d.number === item)
            .reduce((acc: any, curr: any) => Number(acc) + Number(curr.straight), 0),
        };
      } else if (id === "2" && item.length === 2) {
        setHeader(twoDigit);
        return {
          number: item,
          straight: data
            .filter((d: any) => d.number === item)
            .reduce((acc: any, curr: any) => Number(acc) + Number(curr.straight), 0),
          lower: data
            .filter((d: any) => d.number === item)
            .reduce((acc: any, curr: any) => Number(acc) + Number(curr.lower), 0),
        };
      }
    });
    // remove item that has 0 upper and lower and remove undefined
    return sumOfNumber.filter((item: any) => item);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("type");
    setType(id);
    getLottoryOrder(id as string);
  }, []);

  const style = `
        .lotto-title {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
        }
        .table-section {
            padding: 20px;
            display: flex;
            justify-content: center;
            table {
                width: 100%;
                border-collapse: collapse;
                th, td {
                    border: 1px solid #000;
                    padding: 10px;
                    text-align: center;
                }
                th {
                    background-color: #f0f0f0;
                }
            
            }
        }
        .print-btn {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
  return (
    <div className="pdf-container">
      <style>{style}</style>
      <button className="print-btn" onClick={() => window.print()}>
        Print
      </button>
      <div id="section-to-print" className="a4-paper">
        <h1 className="lotto-title">Lotto Report</h1>
        <div className="table-section">
          <table>
            <thead>
              <tr>
                {header.map((item: any, index: any) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.number}</td>
                  <td>{item.straight}</td>
                  {item.upper && <td>{item.upper}</td>}
                  <td>{item.lower}</td>
                </tr>
              ))}
              <tr>
                <td>รวม</td>
                <td>{data.reduce((acc: any, curr: any) => Number(acc) + Number(curr.straight), 0)}</td>
                {type === "3" && <td>{data.reduce((acc: any, curr: any) => Number(acc) + Number(curr.upper), 0)}</td>}
                <td>{data.reduce((acc: any, curr: any) => Number(acc) + Number(curr.lower), 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
