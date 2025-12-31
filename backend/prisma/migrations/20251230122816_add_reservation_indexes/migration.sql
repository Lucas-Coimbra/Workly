-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");

-- CreateIndex
CREATE INDEX "Reservation_workspaceId_idx" ON "Reservation"("workspaceId");

-- CreateIndex
CREATE INDEX "Reservation_workspaceId_status_idx" ON "Reservation"("workspaceId", "status");

-- CreateIndex
CREATE INDEX "Reservation_workspaceId_date_idx" ON "Reservation"("workspaceId", "date");
