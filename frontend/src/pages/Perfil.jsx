import React, { useState } from "react";
import NavPrivate from "../../components/NavPrivate";
import Footer from "../../components/Footer";
import "../../assets/styles/Home.css";
import "../assets/styles/Perfil.css";

const Perfil = () => {
  const [activeTab, setActiveTab] = useState("informacion");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "informacion", name: "Información Personal", icon: "bi-person" },
    { id: "direcciones", name: "Mis Direcciones", icon: "bi-geo" },
    { id: "seguridad", name: "Seguridad", icon: "bi-shield" },
    { id: "preferencias", name: "Preferencias", icon: "bi-sliders" }
  ];

  const [userData, setUserData] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    telefono: "+57 300 123 4567",
    fechaNacimiento: "1990-05-15",
    genero: "masculino"
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      nombre: "Casa",
      direccion: "Calle 123 #45-67",
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      codigoPostal: "110011",
      principal: true
    },
    {
      id: 2,
      nombre: "Oficina",
      direccion: "Carrera 89 #12-34",
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      codigoPostal: "110021",
      principal: false
    }
  ]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar en el backend
  };

  const setPrimaryAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      principal: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <>
      <NavPrivate />
      <main className="profile-page">
        {/* Hero Section de Perfil */}
        <section className="profile-hero">
          <div className="container">
            <div className="hero-content">
              <div className="profile-header">
                <div className="avatar-container">
                  <img 
                    src="/assets/images/avatar.jpg" 
                    alt="Avatar" 
                    className="profile-avatar"
                  />
                  <button className="avatar-edit">
                    <i className="bi bi-camera"></i>
                  </button>
                </div>
                <div className="profile-info">
                  <h1>{userData.nombre}</h1>
                  <p>{userData.email}</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-number">12</span>
                      <span className="stat-label">Pedidos</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">4.8</span>
                      <span className="stat-label">Rating</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">2</span>
                      <span className="stat-label">Años</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs de Perfil */}
        <section className="profile-tabs">
          <div className="container">
            <div className="tabs-container">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={tab.icon}></i>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Contenido de las Tabs */}
        <section className="profile-content">
          <div className="container">
            {/* Información Personal */}
            {activeTab === "informacion" && (
              <div className="tab-content">
                <div className="content-header">
                  <h2>Información Personal</h2>
                  <button 
                    className="btn btn-outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <i className={`bi ${isEditing ? 'bi-x' : 'bi-pencil'}`}></i>
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </button>
                </div>

                <div className="profile-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <input
                        type="text"
                        value={userData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input
                        type="tel"
                        value={userData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Fecha de Nacimiento</label>
                      <input
                        type="date"
                        value={userData.fechaNacimiento}
                        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Género</label>
                      <select
                        value={userData.genero}
                        onChange={(e) => handleInputChange('genero', e.target.value)}
                        disabled={!isEditing}
                      >
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                        <option value="prefiero-no-decir">Prefiero no decir</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={handleSave}>
                        <i className="bi bi-check"></i> Guardar Cambios
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Direcciones */}
            {activeTab === "direcciones" && (
              <div className="tab-content">
                <div className="content-header">
                  <h2>Mis Direcciones</h2>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus"></i> Agregar Dirección
                  </button>
                </div>

                <div className="addresses-grid">
                  {addresses.map(address => (
                    <div key={address.id} className="address-card">
                      <div className="address-header">
                        <h3>{address.nombre}</h3>
                        {address.principal && (
                          <span className="primary-badge">Principal</span>
                        )}
                      </div>
                      
                      <div className="address-info">
                        <p><strong>Dirección:</strong> {address.direccion}</p>
                        <p><strong>Ciudad:</strong> {address.ciudad}</p>
                        <p><strong>Departamento:</strong> {address.departamento}</p>
                        <p><strong>Código Postal:</strong> {address.codigoPostal}</p>
                      </div>

                      <div className="address-actions">
                        {!address.principal && (
                          <button 
                            className="btn btn-outline"
                            onClick={() => setPrimaryAddress(address.id)}
                          >
                            <i className="bi bi-star"></i> Hacer Principal
                          </button>
                        )}
                        <button className="btn btn-outline">
                          <i className="bi bi-pencil"></i> Editar
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => deleteAddress(address.id)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seguridad */}
            {activeTab === "seguridad" && (
              <div className="tab-content">
                <h2>Seguridad de la Cuenta</h2>
                
                <div className="security-settings">
                  <div className="security-item">
                    <div className="security-info">
                      <h3>Cambiar Contraseña</h3>
                      <p>Actualiza tu contraseña regularmente para mantener tu cuenta segura</p>
                    </div>
                    <button className="btn btn-primary">
                      <i className="bi bi-key"></i> Cambiar
                    </button>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h3>Verificación en Dos Pasos</h3>
                      <p>Añade una capa extra de seguridad a tu cuenta</p>
                    </div>
                    <div className="toggle-switch">
                      <input type="checkbox" id="twoFactor" />
                      <label htmlFor="twoFactor"></label>
                    </div>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h3>Sesiones Activas</h3>
                      <p>Revisa y gestiona tus sesiones activas</p>
                    </div>
                    <button className="btn btn-outline">
                      <i className="bi bi-laptop"></i> Ver Sesiones
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferencias */}
            {activeTab === "preferencias" && (
              <div className="tab-content">
                <h2>Preferencias</h2>
                
                <div className="preferences-settings">
                  <div className="preference-item">
                    <h3>Notificaciones</h3>
                    <div className="preference-options">
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Notificaciones por email
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Notificaciones push
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Boletín informativo
                      </label>
                    </div>
                  </div>

                  <div className="preference-item">
                    <h3>Privacidad</h3>
                    <div className="preference-options">
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Perfil público
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Compartir datos con partners
                      </label>
                    </div>
                  </div>

                  <div className="preference-item">
                    <h3>Idioma y Región</h3>
                    <div className="form-group">
                      <label>Idioma</label>
                      <select defaultValue="es">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Zona Horaria</label>
                      <select defaultValue="bogota">
                        <option value="bogota">Bogotá (UTC-5)</option>
                        <option value="mexico">Ciudad de México (UTC-6)</option>
                      </select>
                    </div>
                  </div>

                  <div className="preference-actions">
                    <button className="btn btn-primary">Guardar Preferencias</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Perfil;