const UtilizatorSetup = require("./Utilizator");
const ElevSetup = require("./Elev");
const NotaSetup = require("./Nota");
const ParinteSetup = require("./Parinte");
const EvaluareSetup = require("./Evaluare");
const ParticipareSetup = require("./Participare");
const AnScolarSetup = require("./AnScolar");
const SemestruSetup = require("./Semestru");
const ScoalaSetup = require("./Scoala");
const RepartizareProfesorSetup = require("./RepartizareProfesor");
const DisciplinaSetup = require("./Disciplina");
const ClasaSetup = require("./Clasa");
const ConditiiPromovareSetup = require("./ConditiiPromovare");
const CorigentaSetup = require("./Corigenta");
const RepetentSetup = require("./Repetent");
const IstoricClaseSetup = require("./IstoricClase");
const IntervalClaseSetup = require("./IntervalClase");

module.exports = (database) => {
  const Utilizator = UtilizatorSetup(database);
  const Elev = ElevSetup(database);
  const Parinte = ParinteSetup(database);
  const Evaluare = EvaluareSetup(database);
  const Participare = ParticipareSetup(database);
  const AnScolar = AnScolarSetup(database);
  const Semestru = SemestruSetup(database);
  const Scoala = ScoalaSetup(database);
  const Nota = NotaSetup(database);
  const RepartizareProfesor = RepartizareProfesorSetup(database);
  const Disciplina = DisciplinaSetup(database);
  const Clasa = ClasaSetup(database);
  const ConditiiPromovare = ConditiiPromovareSetup(database);
  const Corigenta = CorigentaSetup(database);
  const Repetent = RepetentSetup(database);
  const IstoricClase = IstoricClaseSetup(database);
  const IntervalClase = IntervalClaseSetup(database);

  Utilizator.hasMany(Elev, { foreignKey: "id_utilizator" });
  Elev.belongsTo(Utilizator, { foreignKey: "id_utilizator" });

  Utilizator.hasMany(Parinte, { foreignKey: "id_utilizator" });
  Parinte.belongsTo(Utilizator, { foreignKey: "id_utilizator" });

  Elev.hasMany(Parinte, { foreignKey: "id_copil" });
  Parinte.belongsTo(Elev, { foreignKey: "id_copil" });

  Scoala.hasMany(Utilizator, { foreignKey: "id_scoala" });
  Utilizator.belongsTo(Scoala, { foreignKey: "id_scoala" });

  Clasa.hasMany(Elev, { foreignKey: "id_clasa" });
  Elev.belongsTo(Clasa, { foreignKey: "id_clasa" });

  AnScolar.hasMany(Clasa, { foreignKey: "id_an_scolar" });
  Clasa.belongsTo(AnScolar, { foreignKey: "id_an_scolar" });

  Utilizator.hasMany(RepartizareProfesor, { foreignKey: "id_profesor" });
  RepartizareProfesor.belongsTo(Utilizator, { foreignKey: "id_profesor" });

  Disciplina.hasMany(RepartizareProfesor, { foreignKey: "id_disciplina" });
  RepartizareProfesor.belongsTo(Disciplina, { foreignKey: "id_disciplina" });

  Clasa.hasMany(RepartizareProfesor, { foreignKey: "id_clasa" });
  RepartizareProfesor.belongsTo(Clasa, { foreignKey: "id_clasa" });

  Scoala.hasMany(Disciplina, { foreignKey: "id_scoala" });
  Disciplina.belongsTo(Scoala, { foreignKey: "id_scoala" });

  RepartizareProfesor.hasMany(Evaluare, { foreignKey: "id_repartizare" });
  Evaluare.belongsTo(RepartizareProfesor, { foreignKey: "id_repartizare" });

  AnScolar.hasMany(RepartizareProfesor, { foreignKey: "id_an_scolar" });
  RepartizareProfesor.belongsTo(AnScolar, { foreignKey: "id_an_scolar" });

  Evaluare.hasMany(Nota, { foreignKey: "id_evaluare" });
  Nota.belongsTo(Evaluare, { foreignKey: "id_evaluare" });

  Elev.hasMany(Nota, { foreignKey: "id_elev" });
  Nota.belongsTo(Elev, { foreignKey: "id_elev" });

  Elev.hasMany(Participare, { foreignKey: "id_elev" });
  Participare.belongsTo(Elev, { foreignKey: "id_elev" });

  RepartizareProfesor.hasMany(Participare, { foreignKey: "id_repartizare" });
  Participare.belongsTo(RepartizareProfesor, { foreignKey: "id_repartizare" });

  Semestru.hasMany(Participare, { foreignKey: "id_semestru" });
  Participare.belongsTo(Semestru, { foreignKey: "id_semestru" });

  Semestru.hasMany(Evaluare, { foreignKey: "id_semestru" });
  Evaluare.belongsTo(Semestru, { foreignKey: "id_semestru" });

  Scoala.hasMany(AnScolar, { foreignKey: "id_scoala" });
  AnScolar.belongsTo(Scoala, { foreignKey: "id_scoala" });

  AnScolar.hasMany(Semestru, { foreignKey: "id_an_scolar" });
  Semestru.belongsTo(AnScolar, { foreignKey: "id_an_scolar" });

  Scoala.hasOne(ConditiiPromovare, { foreignKey: "id_scoala" });
  ConditiiPromovare.belongsTo(Scoala, { foreignKey: "id_scoala" });

  Elev.hasMany(Corigenta, { foreignKey: "id_elev" });
  Corigenta.belongsTo(Elev, { foreignKey: "id_elev" });

  Disciplina.hasMany(Corigenta, { foreignKey: "id_disciplina" });
  Corigenta.belongsTo(Disciplina, { foreignKey: "id_disciplina" });

  AnScolar.hasMany(Corigenta, { foreignKey: "id_an_scolar" });
  Corigenta.belongsTo(AnScolar, { foreignKey: "id_an_scolar" });

  Elev.hasMany(Repetent, { foreignKey: "id_elev" });
  Repetent.belongsTo(Elev, { foreignKey: "id_elev" });

  Scoala.hasMany(Repetent, { foreignKey: "id_scoala" });
  Repetent.belongsTo(Scoala, { foreignKey: "id_scoala" });

  Clasa.hasMany(IstoricClase, { foreignKey: "id" });
  IstoricClase.belongsTo(Clasa, { foreignKey: "id" });

  AnScolar.hasMany(IstoricClase, { foreignKey: "id_an_scolar" });
  IstoricClase.belongsTo(AnScolar, { foreignKey: "id_an_scolar" });

  Scoala.hasMany(IntervalClase, { foreignKey: "id_scoala" });
  IntervalClase.belongsTo(Scoala, { foreignKey: "id_scoala" });

  return {
    Utilizator,
    Elev,
    Parinte,
    Clasa,
    Disciplina,
    RepartizareProfesor,
    Nota,
    Evaluare,
    Participare,
    AnScolar,
    Semestru,
    Scoala,
    ConditiiPromovare,
    Corigenta,
    Repetent,
    IstoricClase,
    IntervalClase,
  };
};
