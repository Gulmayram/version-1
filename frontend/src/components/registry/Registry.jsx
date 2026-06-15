import React, { useState, useMemo } from 'react';
import { translate } from "../../assets/translate";
import { LanguageContext } from '../../LanguageContext';
import './Registry.css';

// Данные из ваших CSV (объединены для примера)
const licenseData = [
  { id: 1, type: "Разработка", region: "Ошская", field: "Наукатское", company: "ОсОО «Фортресс Компани»", mineral: "Гипс" },
  { id: 2, type: "Разработка", region: "Баткенская", field: "Северный Акташ", company: "ОсОО «Джунда»", mineral: "Сурьма, Флюорит" },
  { id: 3, type: "Разведка", region: "Баткенская", field: "Алтын-Джилга", company: "ОсОО «Аурум Голд Компани»", mineral: "Золото" },
  { id: 4, type: "Разведка", region: "Ошская", field: "Сасык-Ункур", company: "ОсОО «Айкан-Тоо»", mineral: "Мраморный известняк" },
  { id: 5, type: "Разработка", region: "Чуйская", field: "Центральный Ак-Моло", company: "ОсОО «Сабила Голд»", mineral: "Каолин" },
  { id: 6, type: "Разработка", region: "Нарынская", field: "Каратор", company: "ОсОО «Кинцайд Тяньшань»", mineral: "Золото" },
  { id: 7, type: "Разведка", region: "Ошская", field: "Раян-Тоо", company: "ОсОО «ЧиВи»", mineral: "Уголь" },
  { id: 8, type: "Разведка", region: "Ошская", field: "Чалкйкур-Акжилгинская", company: "ОсОО «Алтын Ресурсы»", mineral: "Золото, серебро" },
  { id: 9, type: "Разработка", region: "Иссык-Кульская", field: "Кумтор", company: "ЗАО «Кумтор Голд Компани»", mineral: "Золото" },
  { id: 10, type: "Разведка", region: "Таласская", field: "Джеруй", company: "ОсОО «Альянс Алтын»", mineral: "Золото" },
];

const Registry = () => {
  const [filterType, setFilterType] = useState("Все");
  const [filterRegion, setFilterRegion] = useState("Все");

  const filteredData = useMemo(() => {
    return licenseData.filter(item => {
      return (filterType === "Все" || item.type === filterType) &&
             (filterRegion === "Все" || item.region === filterRegion);
    });
  }, [filterType, filterRegion]);

  return (
    <div className="registry-container">
      <h2>Реестр лицензий</h2>
      
      {/* Панель фильтров */}
      <div className="filters">
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="Все">Тип работ (Все)</option>
          <option value="Разработка">Разработка</option>
          <option value="Разведка">Разведка</option>
        </select>

        <select onChange={(e) => setFilterRegion(e.target.value)}>
          <option value="Все">Область (Все)</option>
          <option value="Ошская">Ошская</option>
          <option value="Баткенская">Баткенская</option>
          <option value="Чуйская">Чуйская</option>
          {/* Добавьте остальные области */}
        </select>
      </div>

      {/* Таблица */}
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Месторождение</th>
            <th>Компания</th>
            <th>Ископаемое</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.field}</td>
              <td>{item.company}</td>
              <td>{item.mineral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registry;
