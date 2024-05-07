import React, { useEffect, useRef, useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import { FaTruck, FaBoxOpen, FaCubes } from 'react-icons/fa';
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';

const DashboardPage = () => {
  const [informacion, setInformacion] = useState({ maquinaria: {}, contratos: {}, productos: [] });
  const chartRef = useRef(null);
  const doughnutRef = useRef(null);

  const obtenerToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'No se ha iniciado sesión',
        text: 'Debes iniciar sesión para acceder a esta página',
        confirmButtonColor: '#2F4A5B',
      }).then(() => {
        window.location.href = "/login";
      });
    }
    return token;
  };

  const obtenerInformacion = async () => {
    try {
      const token = obtenerToken();
      const response = await fetch("http://localhost:8080/api/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setInformacion(data);
    } catch (error) {
      console.error("Error al obtener información: ", error);
    }
  };

  useEffect(() => {
    obtenerInformacion();
  }, []);

  useEffect(() => {
    if (chartRef.current && informacion.contratos) {
      const meses = Object.keys(informacion.contratos);
      const datos = Object.values(informacion.contratos);
      const year = new Date().getFullYear(); // Obtener el año actual

      // Configuración del gráfico de líneas
      const ctx = chartRef.current.getContext("2d");
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      chartRef.current.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: meses,
          datasets: [{
            label: "Contratos",
            data: datos,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "rgba(255, 255, 255, 1)",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
          }]
        },
        options: {
          animation: {
            duration: 2000,
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              }
            },
            x: {
              grid: {
                display: false,
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Contratos por Mes (${year})`, // Título con el año actual
              font: {
                size: 20,
                weight: 'bold'
              }
            },
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 12,
              },
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return "Contratos: " + context.parsed.y;
                }
              }
            }
          }
        }
      });
    }
  }, [informacion]);

useEffect(() => {
    if (doughnutRef.current && informacion.productos) {
      const productos = informacion.productos.flatMap(producto => producto.productos);
      const tiposProductos = [...new Set(productos.map(p => p.tipo))];
      const coloresAleatorios = tiposProductos.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`);
  
      const ctx = doughnutRef.current.getContext("2d");
      if (doughnutRef.current.chart) {
        doughnutRef.current.chart.destroy();
      }
      doughnutRef.current.chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: tiposProductos,
          datasets: [{
            data: tiposProductos.map(tipo => productos.filter(p => p.tipo === tipo).length),
            backgroundColor: coloresAleatorios,
            borderColor: coloresAleatorios.map(color => color.replace("0.5", "1")),
            borderWidth: 1,
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Distribución de Productos',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            legend: {
              display: true,
              position: 'right',
              labels: {
                usePointStyle: true,
                generateLabels: function(chart) {
                  const { data } = chart;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const backgroundColor = data.datasets[0].backgroundColor[i];
                      return {
                        text: label,
                        fillStyle: backgroundColor,
                      };
                    });
                  }
                  return [];
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const tipo = context.label || '';
                  if (tipo) {
                    const productosTipo = productos.filter(p => p.tipo === tipo);
                    const productosTooltip = productosTipo.map(p => `${p.nombre}: ${p.cantidad}`);
                    return productosTooltip;
                  }
                  return '';
                }
              }
            }
          }
        }
      });
    }
  }, [informacion]);
  
  

  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Dashboard</BarraSuperior>
      <div className="flex-1 flex justify-center w-full p-1 h-[70%]">
        {/* Primer gráfico */}
        <div style={{ width: '60%', minWidth: '400px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={chartRef} />
        </div>
        {/* Segundo gráfico de Distribución de Productos */}
        <div style={{ width: '30%', minWidth: '200px', height: '100%' }}>
          <canvas ref={doughnutRef} />
        </div>
      </div>
      <div className=" h-[17%] mb-4 flex justify-center w-full p-1 ">
        <div className="flex justify-between w-full gap-2">
          <div className="flex flex-1 items-center justify-center bg-green-600 p-2 rounded-lg">
            <FaTruck className="text-white text-5xl mr-5" />
            <div>
              <h1 className="text-white text-lg">Maquinaria disponible</h1>
              <p className="text-white text-4xl">{informacion.maquinaria.disponible}</p>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center bg-red-700 p-2 rounded-lg">
            <FaBoxOpen className="text-white text-5xl mr-5" />
            <div >
              <h1 className="text-white text-lg">Maquinaria alquilada</h1>
              <p className="text-white text-4xl">{informacion.maquinaria.alquilada}</p>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center bg-blue-50 p-2 rounded-lg">
            <FaCubes className="text-blue-800 text-5xl mr-5" />
            <div >
              <h1 className="text-blue-800 text-lg">Maquinaria total registrada</h1>
              <p className="text-blue-800 text-4xl">{informacion.maquinaria.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
