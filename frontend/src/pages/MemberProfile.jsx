import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import ProfileHeader from "../components/profileM/ProfileHeader";
import StatsCard from "../components/profileM/StatsCard";
import CreditCard from "../components/profileM/CreditCard";
import PersonalInfo from "../components/profileM/PersonalInfo";
import AddressCard from "../components/profileM/AddressCard";
import PlanCard from "../components/profileM/PlanCard";
import TransactionsHistory from "../components/profileM/TransactionsHistory";

import AddCreditsModal from "../components/profileM/modals/AddCreditsModal";
import WithdrawModal from "../components/profileM/modals/WithdrawModal";
import ChangePlanModal from "../components/profileM/modals/ChangePlanModal";

import { Card, Button } from "../components/ui";
import { CheckCircle } from "lucide-react";

import {
  profileDataMock,
  statsMock,
  creditTransactionsMock,
  currentPlanMock,
  planData,
} from "../mocks/profileMock";

export default function MemberProfile({ onLogout }) {
  const navigate = useNavigate();

  /* =======================
     STATES
  ======================= */
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState(profileDataMock);
  const [tempData, setTempData] = useState({ ...profileDataMock });

  const [accountBalance, setAccountBalance] = useState(350);
  const [creditAmount, setCreditAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [showAddCreditsModal, setShowAddCreditsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const currentPlanName = currentPlanMock.name;

  /* =======================
     CONTROLE DE ALTERAÇÕES
  ======================= */
  const hasUnsavedChanges =
    isEditing && JSON.stringify(profileData) !== JSON.stringify(tempData);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const safeNavigate = (to) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "Você tem alterações não salvas. Deseja sair sem salvar?"
      );
      if (!confirmLeave) return;
    }
    navigate(to);
  };

  /* =======================
     PERFIL
  ======================= */
  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmCancel = window.confirm("Deseja descartar as alterações?");
      if (!confirmCancel) return;
    }
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  /* =======================
     CRÉDITOS
  ======================= */
  const handleAddCredits = () => {
    const amount = parseFloat(creditAmount);
    if (amount > 0) {
      setAccountBalance((prev) => prev + amount);
      setCreditAmount("");
      setShowAddCreditsModal(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= accountBalance) {
      setAccountBalance((prev) => prev - amount);
      setWithdrawAmount("");
      setShowWithdrawModal(false);
    }
  };

  /* =======================
     HISTÓRICO (BLOQUEADO)
  ======================= */
  const handleViewHistory = () => {
    if (isEditing) return;
    safeNavigate("/history");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        userType="member"
        navigate={safeNavigate}
        onLogout={onLogout}
        currentPage="profile"
      />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {saveSuccess && (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700">Perfil atualizado com sucesso!</p>
              </div>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* COLUNA ESQUERDA */}
            <div className="space-y-6">
              <ProfileHeader profileData={profileData} stats={statsMock} />

              <CreditCard
                accountBalance={accountBalance}
                onAddClick={() => setShowAddCreditsModal(true)}
                onWithdrawClick={() => setShowWithdrawModal(true)}
              />

              <StatsCard stats={statsMock} />
            </div>

            {/* COLUNA DIREITA */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Meu Perfil
                </h1>
                <p className="text-gray-600 mt-1">
                  Gerencie suas informações pessoais, plano e histórico.
                </p>
              </div>

              {/* PLANO — ESTADO 1 */}
              <PlanCard
                currentPlan={currentPlanMock}
                onChangePlan={() => {
                  if (!isEditing) setShowChangePlanModal(true);
                }}
                disabled={isEditing}
              />

              {/* HISTÓRICO */}
              <TransactionsHistory
                transactions={creditTransactionsMock}
                onViewAll={handleViewHistory}
                disabled={isEditing}
              />

              {/* ÚNICO BOTÃO DE EDIÇÃO */}
              <div className="flex justify-end">
                {!isEditing ? (
                  <Button onClick={handleEdit}>Editar informações</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>Salvar</Button>
                  </div>
                )}
              </div>

              <PersonalInfo
                profileData={profileData}
                tempData={tempData}
                isEditing={isEditing}
                setTempData={setTempData}
              />

              <AddressCard
                profileData={profileData}
                tempData={tempData}
                isEditing={isEditing}
                setTempData={setTempData}
              />
            </div>
          </div>
        </div>
      </main>

      {/* MODAIS */}
      <AddCreditsModal
        open={showAddCreditsModal}
        onClose={() => setShowAddCreditsModal(false)}
        creditAmount={creditAmount}
        setCreditAmount={setCreditAmount}
        onAdd={handleAddCredits}
      />

      <WithdrawModal
        open={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        withdrawAmount={withdrawAmount}
        setWithdrawAmount={setWithdrawAmount}
        accountBalance={accountBalance}
        onWithdraw={handleWithdraw}
      />

      <ChangePlanModal
        open={showChangePlanModal}
        onClose={() => setShowChangePlanModal(false)}
        plans={planData}
        currentPlanName={currentPlanName}
      />

      <Footer />
    </div>
  );
}
