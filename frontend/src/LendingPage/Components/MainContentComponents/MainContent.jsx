import React, { useState } from "react";
import {
  DollarSign,
  ChevronDown,
  Filter,
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Info,
  AlertCircle,
  Wallet,
  Search,
  ArrowLeft,
} from "lucide-react";
import { getRiskBadge } from "../../Components/getRiskBadgeFunction";
export default function MainContent({
  activeTab,
  setActiveTab,
  lendingPools,
  myLendingPositions,
}) {
  return (
    <>
      <div className="mb-24">
        {activeTab === "available" ? (
          /* Available Lending Markets */
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="pb-4 pl-4">Asset</th>
                  <th className="pb-4">APY</th>
                  <th className="pb-4 hidden md:table-cell">Risk Level</th>
                  <th className="pb-4 hidden md:table-cell">Total Supply</th>
                  <th className="pb-4 hidden md:table-cell">Utilization</th>
                  <th className="pb-4 hidden md:table-cell">Insurance</th>
                  <th className="pb-4 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {lendingPools.map((pool, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="py-4 pl-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{pool.icon}</div>
                        <div>{pool.name}</div>
                      </div>
                    </td>
                    <td className="py-4 text-green-400 font-medium">
                      {pool.apy}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {getRiskBadge(pool.riskLevel)}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {pool.totalSupply}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: pool.utilization }}
                          ></div>
                        </div>
                        <span>{pool.utilization}</span>
                      </div>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {pool.insuranceCoverage}
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                        Lend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* My Lending Positions */
          <div>
            {myLendingPositions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {myLendingPositions.map((position, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-xl border border-blue-900 p-6 shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="text-2xl mr-3">{position.icon}</div>
                        <div>
                          <h3 className="font-bold">{position.name}</h3>
                          <p className="text-gray-400">
                            {position.amount} {position.name} supplied
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div>
                          <p className="text-gray-400 text-sm">
                            Position Value
                          </p>
                          <p className="font-medium">{position.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Current APY</p>
                          <p className="font-medium text-green-400">
                            {position.apy}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            Accrued Interest
                          </p>
                          <p className="font-medium text-green-400">
                            {position.accrued}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Insurance</p>
                          <p className="font-medium text-blue-400">
                            {position.insuranceCoverage}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                          Withdraw
                        </button>
                        <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900 transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-10 border border-blue-900 text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-medium mb-2">
                  No lending positions yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start by supplying assets to earn interest on your crypto
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors mx-auto flex items-center">
                  View available markets
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
