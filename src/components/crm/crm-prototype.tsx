"use client";

import { useEffect, useMemo, useState } from "react";
import {
  GripVertical,
  Plus,
  Save,
  Settings2,
  Trash2,
} from "lucide-react";

type Attribute = {
  id: string;
  name: string;
};

type Deal = {
  id: string;
  values: Record<string, string>;
  selected?: boolean;
};

type CrmState = {
  companies: string[];
  attributes: Attribute[];
  deals: Deal[];
};

const storageKey = "portfolio.crm-platform.prototype.v1";

const initialState: CrmState = {
  companies: ["Apple", "Samsung", "Naver"],
  attributes: [
    { id: "company", name: "Company" },
    { id: "round", name: "Investment Round" },
    { id: "phone", name: "전화 번호" },
    { id: "email", name: "이메일" },
    { id: "memo", name: "메모" },
    { id: "createdAt", name: "생성 날짜" },
    { id: "updatedAt", name: "수정 날짜" },
  ],
  deals: [
    {
      id: "deal-1",
      values: {
        company: "Apple",
        round: "Series A",
        phone: "010-2381-1004",
        email: "apple@example.com",
        memo: "초기 미팅 완료",
        createdAt: "2024-06-09 10:20:00",
        updatedAt: "2024-06-14 15:12:00",
      },
    },
    {
      id: "deal-2",
      values: {
        company: "Samsung",
        round: "Seed",
        phone: "010-9812-4431",
        email: "samsung@example.com",
        memo: "제안서 발송",
        createdAt: "2024-06-10 11:00:00",
        updatedAt: "2024-06-16 19:30:00",
      },
    },
    {
      id: "deal-3",
      values: {
        company: "Naver",
        round: "Follow-on",
        phone: "010-5500-9012",
        email: "naver@example.com",
        memo: "조건 협의 중",
        createdAt: "2024-06-12 09:40:00",
        updatedAt: "2024-06-17 13:44:00",
      },
    },
  ],
};

function nowText() {
  const date = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function CrmPrototype() {
  const [crm, setCrm] = useState<CrmState>(initialState);
  const [storageReady, setStorageReady] = useState(false);
  const [newAttribute, setNewAttribute] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [editingAttribute, setEditingAttribute] = useState<string>("company");
  const [editingAttributeName, setEditingAttributeName] = useState("Company");

  useEffect(() => {
    void Promise.resolve().then(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as CrmState;
          setCrm(parsed);
          setEditingAttribute(parsed.attributes[0]?.id ?? "company");
          setEditingAttributeName(parsed.attributes[0]?.name ?? "Company");
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
      setStorageReady(true);
    });
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem(storageKey, JSON.stringify(crm));
  }, [crm, storageReady]);

  const selectedDeals = useMemo(
    () => crm.deals.filter((deal) => deal.selected),
    [crm.deals],
  );

  function addDeal() {
    const date = nowText();
    const values = Object.fromEntries(
      crm.attributes.map((attribute) => [
        attribute.id,
        attribute.id === "createdAt" || attribute.id === "updatedAt" ? date : "",
      ]),
    );

    setCrm((current) => ({
      ...current,
      deals: [{ id: createId("deal"), values }, ...current.deals],
    }));
  }

  function updateDeal(dealId: string, attributeId: string, value: string) {
    setCrm((current) => ({
      ...current,
      deals: current.deals.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              values: {
                ...deal.values,
                [attributeId]: value,
                updatedAt: nowText(),
              },
            }
          : deal,
      ),
    }));
  }

  function addAttribute() {
    const name = newAttribute.trim();
    if (!name) return;

    const attribute = {
      id: createId("attr"),
      name,
    };

    setCrm((current) => ({
      ...current,
      attributes: [...current.attributes, attribute],
      deals: current.deals.map((deal) => ({
        ...deal,
        values: { ...deal.values, [attribute.id]: "" },
      })),
    }));
    setNewAttribute("");
  }

  function updateAttributeName() {
    const name = editingAttributeName.trim();
    if (!name) return;

    setCrm((current) => ({
      ...current,
      attributes: current.attributes.map((attribute) =>
        attribute.id === editingAttribute ? { ...attribute, name } : attribute,
      ),
    }));
  }

  function deleteAttribute() {
    if (["company", "createdAt", "updatedAt"].includes(editingAttribute)) return;

    setCrm((current) => ({
      ...current,
      attributes: current.attributes.filter((attribute) => attribute.id !== editingAttribute),
      deals: current.deals.map((deal) => {
        const values = { ...deal.values };
        delete values[editingAttribute];
        return { ...deal, values };
      }),
    }));
    const first = crm.attributes[0];
    setEditingAttribute(first.id);
    setEditingAttributeName(first.name);
  }

  function addCompany() {
    const name = newCompany.trim();
    if (!name || crm.companies.includes(name)) return;

    setCrm((current) => ({
      ...current,
      companies: [...current.companies, name],
    }));
    setNewCompany("");
  }

  function deleteSelectedDeals() {
    setCrm((current) => ({
      ...current,
      deals: current.deals.filter((deal) => !deal.selected),
    }));
  }

  return (
    <div className="bg-[#0f1011] p-3 sm:p-5">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#08090a]">
        <div className="min-h-[560px]">
          <section className="min-w-0 p-4">
            <div className="mb-3 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h3 className="text-[20px] font-normal tracking-[-0.288px]">
                  Workspace Deal Grid
                </h3>
                <p className="mt-1 text-[12px] text-[#8a8f98]">
                  원본의 AG Grid 거래/속성 편집 흐름을 브라우저 저장소로 재현했습니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addDeal}
                  className="inline-flex h-8 items-center gap-1.5 rounded-[6px] bg-[#5e6ad2] px-3 text-[12px] font-medium"
                >
                  <Plus className="size-3.5" />
                  거래 추가
                </button>
                <button
                  type="button"
                  onClick={deleteSelectedDeals}
                  disabled={selectedDeals.length === 0}
                  className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-white/[0.08] bg-white/[0.03] px-3 text-[12px] font-medium disabled:opacity-40"
                >
                  <Trash2 className="size-3.5" />
                  선택 삭제
                </button>
              </div>
            </div>

            <div className="mb-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_210px]">
              <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-2.5">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="mb-1 text-[11px] font-medium uppercase text-[#7170ff]">
                      Company
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {crm.companies.map((company) => (
                        <span
                          key={company}
                          className="rounded-[999px] border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[12px] text-[#d0d6e0]"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex min-w-0 gap-2 lg:w-[250px]">
                    <input
                      value={newCompany}
                      onChange={(event) => setNewCompany(event.target.value)}
                      placeholder="회사 추가"
                      className="h-8 min-w-0 flex-1 rounded-[6px] border border-white/[0.08] bg-[#08090a] px-2.5 text-[12px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCompany}
                      className="h-8 rounded-[6px] bg-[#5e6ad2] px-2.5"
                      aria-label="회사 추가"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-2.5">
                <p className="mb-1 text-[11px] font-medium uppercase text-[#7170ff]">
                  Deals
                </p>
                <div className="flex items-center justify-between text-[12px] text-[#d0d6e0]">
                  <span>진행 중 {crm.deals.length}건</span>
                  <span className="text-[#8a8f98]">선택됨 {selectedDeals.length}건</span>
                </div>
              </div>
            </div>

            <div className="mb-3 grid gap-3 xl:grid-cols-2">
              <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-2.5">
                <p className="mb-2 flex items-center gap-2 text-[12px] font-medium">
                  <Plus className="size-3.5 text-[#7170ff]" />
                  속성 추가
                </p>
                <div className="flex gap-2">
                  <input
                    value={newAttribute}
                    onChange={(event) => setNewAttribute(event.target.value)}
                    placeholder="예: 담당자, 상태, 예상 매출"
                    className="h-8 min-w-0 flex-1 rounded-[6px] border border-white/[0.08] bg-[#08090a] px-2.5 text-[12px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="h-8 rounded-[6px] bg-[#5e6ad2] px-3 text-[12px] font-medium"
                  >
                    추가
                  </button>
                </div>
              </div>

              <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.02] p-2.5">
                <p className="mb-2 flex items-center gap-2 text-[12px] font-medium">
                  <Settings2 className="size-3.5 text-[#7170ff]" />
                  속성 편집
                </p>
                <div className="flex gap-2">
                  <select
                    value={editingAttribute}
                    onChange={(event) => {
                      const attribute = crm.attributes.find(
                        (item) => item.id === event.target.value,
                      );
                      if (!attribute) return;
                      setEditingAttribute(attribute.id);
                      setEditingAttributeName(attribute.name);
                    }}
                    className="h-8 min-w-[118px] rounded-[6px] border border-white/[0.08] bg-[#08090a] px-2.5 text-[12px] outline-none"
                  >
                    {crm.attributes.map((attribute) => (
                      <option key={attribute.id} value={attribute.id}>
                        {attribute.name}
                      </option>
                    ))}
                  </select>
                  <input
                    value={editingAttributeName}
                    onChange={(event) => setEditingAttributeName(event.target.value)}
                    className="h-8 min-w-0 flex-1 rounded-[6px] border border-white/[0.08] bg-[#08090a] px-2.5 text-[12px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={updateAttributeName}
                    className="h-8 rounded-[6px] border border-white/[0.08] bg-white/[0.04] px-2.5"
                    aria-label="속성 이름 저장"
                  >
                    <Save className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={deleteAttribute}
                    className="h-8 rounded-[6px] border border-white/[0.08] bg-white/[0.04] px-2.5"
                    aria-label="속성 삭제"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-[8px] border border-white/[0.08]">
              <table className="min-w-[1080px] border-collapse text-left text-[12px]">
                <thead className="bg-[#17191f] text-[#d0d6e0]">
                  <tr>
                    <th className="w-10 px-3 py-2.5">
                      <span className="sr-only">선택</span>
                    </th>
                    {crm.attributes.map((attribute) => (
                      <th key={attribute.id} className="min-w-[138px] px-3 py-2.5 font-medium">
                        <span className="inline-flex items-center gap-2">
                          <GripVertical className="size-3 text-[#62666d]" />
                          {attribute.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {crm.deals.map((deal) => (
                    <tr key={deal.id} className="bg-[#0d0f13] hover:bg-white/[0.03]">
                      <td className="px-3 py-1.5">
                        <input
                          type="checkbox"
                          checked={Boolean(deal.selected)}
                          onChange={(event) =>
                            setCrm((current) => ({
                              ...current,
                              deals: current.deals.map((item) =>
                                item.id === deal.id
                                  ? { ...item, selected: event.target.checked }
                                  : item,
                              ),
                            }))
                          }
                        />
                      </td>
                      {crm.attributes.map((attribute) => (
                        <td key={attribute.id} className="px-2 py-1.5">
                          {attribute.id === "company" ? (
                            <select
                              value={deal.values[attribute.id] ?? ""}
                              onChange={(event) =>
                                updateDeal(deal.id, attribute.id, event.target.value)
                              }
                              className="h-8 w-full rounded-[4px] border border-white/[0.06] bg-[#08090a] px-2 outline-none"
                            >
                              <option value="">선택</option>
                              {crm.companies.map((company) => (
                                <option key={company} value={company}>
                                  {company}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              value={deal.values[attribute.id] ?? ""}
                              onChange={(event) =>
                                updateDeal(deal.id, attribute.id, event.target.value)
                              }
                              readOnly={
                                attribute.id === "createdAt" || attribute.id === "updatedAt"
                              }
                              className="h-8 w-full rounded-[4px] border border-white/[0.06] bg-[#08090a] px-2 outline-none read-only:text-[#62666d]"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
